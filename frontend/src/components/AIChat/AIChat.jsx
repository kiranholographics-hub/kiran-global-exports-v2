import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatHeader from './ChatHeader';
import ChatGate from './ChatGate';
import ChatMessages from './ChatMessages';
import SuggestedQuestions from './SuggestedQuestions';
import ChatInput from './ChatInput';
import { getMockReply } from './mockReply';
import { submitChatLead, fetchLeadStatus } from './chatLead';
import styles from './AIChat.module.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';
const HISTORY_KEY = 'kge-ai-chat-history';
const LEAD_KEY = 'kge-ai-chat-lead';
const POLL_INTERVAL_MS = 3000;

const QUICK_QUESTIONS = [
  'How does this work?',
  'Do you offer custom logo towels?',
  'I need a bulk export quotation.',
  'Contact support',
];

function firstName(name) {
  return (name || '').trim().split(/\s+/)[0] || '';
}

function welcomeMessageFor(lead) {
  const name = firstName(lead?.name);
  return {
    id: 'welcome',
    role: 'assistant',
    content: name
      ? `Hi ${name}! 👋 Thanks for your patience — how can I help you today?`
      : 'Hi! 👋 How can I help you today?',
    timestamp: null,
  };
}

function loadLead() {
  try {
    const raw = sessionStorage.getItem(LEAD_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.stage) return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveLead(leadState) {
  try {
    if (leadState) sessionStorage.setItem(LEAD_KEY, JSON.stringify(leadState));
    else sessionStorage.removeItem(LEAD_KEY);
  } catch {
    // ignore — private mode / quota
  }
}

function loadHistory(fallback) {
  try {
    const raw = sessionStorage.getItem(HISTORY_KEY);
    if (!raw) return [fallback];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length ? parsed : [fallback];
  } catch {
    return [fallback];
  }
}

function saveHistory(messages) {
  try {
    sessionStorage.setItem(HISTORY_KEY, JSON.stringify(messages));
  } catch {
    // ignore
  }
}

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const initialLead = useRef(loadLead()).current;
  const [stage, setStage] = useState(initialLead?.stage || 'gate'); // gate | pending | declined | error | chat
  const [lead, setLead] = useState(initialLead?.lead || null);
  const [submittingGate, setSubmittingGate] = useState(false);

  const [messages, setMessages] = useState(() =>
    loadHistory(welcomeMessageFor(initialLead?.stage === 'chat' ? initialLead.lead : null))
  );
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastFailedMessage, setLastFailedMessage] = useState(null);
  const autoSentRef = useRef(Boolean(initialLead?.autoSent));

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const launcherRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    saveLead(lead ? { stage, lead, autoSent: autoSentRef.current } : { stage, autoSent: autoSentRef.current });
  }, [stage, lead]);

  useEffect(() => {
    saveHistory(messages);
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, loading, error]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 250);
      return () => clearTimeout(t);
    }
  }, [open, stage]);

  useEffect(() => {
    if (!open) return;
    function handleKey(event) {
      if (event.key === 'Escape' && !menuOpen) {
        setOpen(false);
        launcherRef.current?.focus();
      }
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, menuOpen]);

  // Poll for approval while a lead is pending.
  useEffect(() => {
    if (stage !== 'pending' || !lead) return;
    let cancelled = false;

    async function poll() {
      const status = await fetchLeadStatus(lead);
      if (cancelled) return;
      if (status === 'approved') {
        setMessages([welcomeMessageFor(lead)]);
        setStage('chat');
      } else if (status === 'declined') {
        setStage('declined');
      }
    }

    const t = setInterval(poll, POLL_INTERVAL_MS);
    poll(); // check immediately too
    return () => {
      cancelled = true;
      clearInterval(t);
    };
  }, [stage, lead]);

  const requestReply = useCallback(
    async (message, history) => {
      try {
        // Pass the (real, non-mock) leadId along so the backend can verify
        // this chat was actually approved before answering — see
        // POST /api/ai-chat in the backend for that check.
        const leadId = lead && !lead.mocked ? lead.leadId : undefined;
        const response = await fetch(`${API_BASE}/api/ai-chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message, history, leadId }),
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok || !data.reply) throw new Error(data.error || 'bad-response');
        return data.reply;
      } catch {
        return getMockReply(message);
      }
    },
    [lead]
  );

  const sendMessage = useCallback(
    async (rawMessage) => {
      const message = (rawMessage ?? input).trim();
      if (!message || loading) return;

      const outgoing = { id: `u-${Date.now()}`, role: 'user', content: message, timestamp: Date.now() };
      const history = messages.slice(-10).map(({ role, content }) => ({ role, content }));

      setMessages((current) => [...current, outgoing]);
      setInput('');
      setError(null);
      setLastFailedMessage(null);
      setLoading(true);

      try {
        const reply = await requestReply(message, history);
        setMessages((current) => [
          ...current,
          { id: `a-${Date.now()}`, role: 'assistant', content: reply, timestamp: Date.now() },
        ]);
      } catch {
        setError('Sorry, something went wrong. Please try again or use the contact form.');
        setLastFailedMessage(message);
      } finally {
        setLoading(false);
      }
    },
    [input, loading, messages, requestReply]
  );

  // Once approved, if the visitor already typed a question in the gate form,
  // send it automatically so they don't have to repeat themselves.
  useEffect(() => {
    if (stage === 'chat' && lead?.question && !autoSentRef.current) {
      autoSentRef.current = true;
      sendMessage(lead.question);
    }
  }, [stage, lead, sendMessage]);

  async function handleGateSubmit(values) {
    setSubmittingGate(true);
    const result = await submitChatLead(values);
    if (result.status === 'error') {
      setLead({ ...values, ...result });
      setStage('error');
      setSubmittingGate(false);
      return;
    }
    const nextLead = { ...values, ...result };
    setLead(nextLead);
    setStage('pending');
    setSubmittingGate(false);
  }

  function handleGateRetry() {
    setLead(null);
    setStage('gate');
  }

  function handleRetry() {
    if (lastFailedMessage) sendMessage(lastFailedMessage);
  }

  function handleClearChat() {
    setMessages([welcomeMessageFor(null)]);
    setError(null);
    setLastFailedMessage(null);
    setLead(null);
    setStage('gate');
    autoSentRef.current = false;
    try {
      sessionStorage.removeItem(HISTORY_KEY);
      sessionStorage.removeItem(LEAD_KEY);
    } catch {
      // ignore
    }
  }

  function handleToggle() {
    setOpen((value) => !value);
  }

  const showSuggestions = stage === 'chat' && messages.length === 1 && messages[0].id === 'welcome';

  return (
    <div className={styles.root}>
      <AnimatePresence>
        {open && (
          <motion.section
            className={styles.panel}
            role="dialog"
            aria-label="Kiran AI chat assistant"
            aria-labelledby={titleId}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <ChatHeader
              titleId={titleId}
              menuOpen={menuOpen}
              onToggleMenu={setMenuOpen}
              onClearChat={handleClearChat}
              onClose={() => setOpen(false)}
            />

            {stage !== 'chat' ? (
              <ChatGate
                stage={stage}
                lead={lead}
                submitting={submittingGate}
                onSubmit={handleGateSubmit}
                onRetry={handleGateRetry}
              />
            ) : (
              <>
                <ChatMessages
                  messages={messages}
                  loading={loading}
                  error={error}
                  onRetry={handleRetry}
                  messagesEndRef={messagesEndRef}
                />

                <SuggestedQuestions
                  questions={showSuggestions ? QUICK_QUESTIONS : []}
                  onSelect={sendMessage}
                  disabled={loading}
                />

                <ChatInput
                  value={input}
                  onChange={setInput}
                  onSend={() => sendMessage()}
                  disabled={loading}
                  inputRef={inputRef}
                />

                <div className={styles.note}>AI can make mistakes. For final pricing and specifications, request a quotation.</div>
              </>
            )}
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button
        ref={launcherRef}
        type="button"
        className={styles.launcher}
        onClick={handleToggle}
        aria-expanded={open}
        aria-label={open ? 'Close AI chat assistant' : 'Open AI chat assistant'}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="21" height="21" viewBox="0 0 21 21" fill="none" aria-hidden="true">
            <path
              d="M3 10.6C3 6.4 6.6 3 11 3s8 3.4 8 7.6-3.6 7.6-8 7.6c-1 0-1.9-.15-2.75-.42L3 19l1.35-3.55C3.5 14.15 3 12.45 3 10.6Z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
            <circle cx="7.4" cy="10.6" r="0.9" fill="currentColor" />
            <circle cx="11" cy="10.6" r="0.9" fill="currentColor" />
            <circle cx="14.6" cy="10.6" r="0.9" fill="currentColor" />
          </svg>
        )}
      </motion.button>
    </div>
  );
}
