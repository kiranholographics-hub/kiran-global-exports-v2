import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

/* ── Direction offset map ──────────────────────── */
const OFFSETS = {
  up:    { x: 0,   y: 22  },
  down:  { x: 0,   y: -22 },
  left:  { x: 22,  y: 0   },
  right: { x: -22, y: 0   },
  none:  { x: 0,   y: 0   },
};

/* ── Default easing ────────────────────────────── */
const EASE_PREMIUM = [0.16, 1, 0.3, 1];

/* ═══════════════════════════════════════════════ */
/**
 * ScrollReveal — triggers fade + slide animation
 * when the element enters the viewport.
 *
 * Props:
 *  children    — content to reveal
 *  direction   — 'up' | 'down' | 'left' | 'right' | 'none'
 *  delay       — animation delay in seconds
 *  duration    — animation duration in seconds
 *  amount      — 0–1, how much of element must be visible to trigger
 *  once        — trigger only once (default: true)
 *  as          — HTML tag or motion component string
 *  className   — passthrough className
 */
export default function ScrollReveal({
  children,
  direction = 'up',
  delay     = 0,
  duration  = 0.55,
  amount    = 0.15,
  once      = true,
  as        = 'div',
  className,
  ...rest
}) {
  const ref          = useRef(null);
  const prefersReduced = useReducedMotion();

  /* Trigger when element enters viewport */
  const isInView = useInView(ref, {
    once,
    margin: '0px 0px -40px 0px',
    amount,
  });

  /* Resolve offset */
  const offset = OFFSETS[direction] ?? OFFSETS.up;

  /* Resolve motion component */
  const Component =
    typeof as === 'string'
      ? (motion[as] ?? motion.div)
      : as;

  /* Reduced motion — just fade, no slide */
  const initial = prefersReduced
    ? { opacity: 0 }
    : { opacity: 0, ...offset };

  const animate = isInView
    ? { opacity: 1, x: 0, y: 0 }
    : initial;

  const transition = {
    duration: prefersReduced ? 0.20 : duration,
    delay:    prefersReduced ? 0    : delay,
    ease:     EASE_PREMIUM,
  };

  return (
    <Component
      ref={ref}
      className={className}
      initial={initial}
      animate={animate}
      transition={transition}
      {...rest}
    >
      {children}
    </Component>
  );
}