import { useMemo, useState } from 'react';
import Link from '@/components/Link/Link';
import SEO from '@/components/SEO/SEO';
import PageIntro from '@/components/PageIntro/PageIntro';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import SectionHeading from '@/components/SectionHeading/SectionHeading';
import CTASection from '@/components/CTASection/CTASection';
import { compareQuotes, UNITS, TERMS } from '@/lib/quoteCompare';
import base from './TowelCalculator.module.css';
import extra from './QuoteComparison.module.css';

// Worked example values, shown so the page is never blank. They are
// hypothetical and are the same figures the quotation guide works through.
// They are not our prices.
const EXAMPLE = {
  quantity: '12000',
  freight: '3360',
  a: { price: '3.40', unit: 'piece', term: 'FOB', length: '70', width: '140', gsm: '500' },
  b: { price: '3.70', unit: 'piece', term: 'CIF', length: '70', width: '140', gsm: '500' },
};

const FAQS = [
  {
    q: 'Why can the lower price be the more expensive towel?',
    a: 'Three things differ between quotes that look alike. The towels can weigh different amounts, so a lower price per piece can be a lighter towel. The prices can be per piece in one quote and per kilogram in another. And one quote can be FOB while the other includes freight and insurance. Putting both on the same weight, unit and trade term shows what is really being compared.',
  },
  {
    q: 'How do I turn a price per kilogram into a price per piece?',
    a: 'Multiply the price per kilogram by the weight of one towel in kilograms. A 70 × 140 cm towel at 500 GSM weighs 0.98 × 500 = 490 g, so at 7.20 per kilogram it is 7.20 × 0.490 = 3.53 per piece. The same price per kilogram on a 450 GSM towel of that size is 3.18 per piece, because the towel is lighter. Ask the supplier for the piece weight and the tolerance on it.',
  },
  {
    q: 'Why does the tool ask for freight and insurance?',
    a: 'An FOB price ends when the goods are loaded on the vessel at the Indian port. A CIF price includes ocean freight to your port and insurance. To compare one of each, the FOB quote needs the freight and insurance added, and the figure comes from your freight forwarder. Enter the total for the whole order. If both quotes are on the same term you can leave it empty.',
  },
  {
    q: 'What does the comparison leave out?',
    a: 'Import duty, taxes, customs clearance, delivery to your warehouse and bank charges depend on your country and on the declared value, so they are not included. Add them to every quote you compare, including a local one. The tool also cannot judge quality, the reliability of a supplier, or whether the weight in a quote will be what arrives. A sample is the only way to confirm that.',
  },
  {
    q: 'Does the tool use Kiran Global Exports prices?',
    a: 'No. Every figure comes from you, and the values on the page when it opens are an example, not our prices or a quotation. Our export team replies to a specification with an FOB quotation.',
  },
];

const GUIDES = [
  { href: '/updates/compare-towel-quotations-like-for-like', label: 'How to compare two towel quotations like for like' },
  { href: '/updates/what-fob-actually-means-when-buying-towels-from-india', label: 'What FOB actually means when buying towels from India' },
  { href: '/updates/reading-a-towel-spec-sheet', label: 'How to read a towel spec sheet' },
  { href: '/updates/what-to-send-a-towel-manufacturer-when-you-ask-for-a-quote', label: 'What to send a towel manufacturer when you ask for a quote' },
];

const fmt = (n, digits = 2) =>
  n.toLocaleString('en-GB', { minimumFractionDigits: digits, maximumFractionDigits: digits });

function Field({ id, label, unit, value, onChange, hint }) {
  return (
    <div className={base.field}>
      <label htmlFor={id}>
        {label} {unit && <span className={base.unit}>({unit})</span>}
      </label>
      <input
        id={id}
        type="text"
        inputMode="decimal"
        autoComplete="off"
        value={value}
        onChange={(ev) => onChange(ev.target.value)}
      />
      {hint && <p className={base.fieldHint}>{hint}</p>}
    </div>
  );
}

function SelectField({ id, label, value, onChange, options }) {
  return (
    <div className={`${base.field} ${extra.select}`}>
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={(ev) => onChange(ev.target.value)}>
        {options.map((o) => (
          <option key={o.id} value={o.id}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

function QuotePanel({ name, quote, onChange }) {
  const set = (key) => (value) => onChange({ ...quote, [key]: value });
  const id = (s) => `quote-${name.toLowerCase()}-${s}`;
  return (
    <div className={base.panel} role="group" aria-label={`Quotation ${name}`}>
      <h2 className={base.panelTitle}>Quotation {name}</h2>
      <div className={base.grid2}>
        <Field id={id('price')} label="Price" value={quote.price} onChange={set('price')} />
        <SelectField id={id('unit')} label="Priced" value={quote.unit} onChange={set('unit')} options={UNITS} />
      </div>
      <div className={base.grid2}>
        <SelectField id={id('term')} label="Trade term" value={quote.term} onChange={set('term')} options={TERMS} />
      </div>
      <h3 className={extra.subTitle}>The towel</h3>
      <div className={base.grid3}>
        <Field id={id('length')} label="Length" unit="cm" value={quote.length} onChange={set('length')} />
        <Field id={id('width')} label="Width" unit="cm" value={quote.width} onChange={set('width')} />
        <Field id={id('gsm')} label="GSM" value={quote.gsm} onChange={set('gsm')} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════ */
export default function QuoteComparison() {
  const [values, setValues] = useState(EXAMPLE);
  const result = useMemo(() => compareQuotes(values), [values]);

  const lightHeavy = useMemo(() => {
    if (result.error) return null;
    const [a, b] = result.rows;
    if (a.grams === null || b.grams === null) return null;
    const gap = Math.abs(a.grams - b.grams) / Math.max(a.grams, b.grams);
    return gap > 0.02 ? { lighter: a.grams < b.grams ? 'A' : 'B', gap: gap * 100 } : null;
  }, [result]);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Export', href: '/export' },
    { label: 'Towel quotation comparison' },
  ];

  return (
    <>
      <SEO
        title="Towel Quotation Comparison Tool"
        description="Free tool for towel importers: put two quotations on one basis — piece weight, price per piece or per kg, FOB against CIF — and see which is lower."
        faqs={FAQS}
        breadcrumbs={breadcrumbs}
      />

      <PageIntro
        eyebrow="Free tool"
        title="Towel quotation comparison tool."
        lead="Enter two quotations. The tool works out the weight of one towel, the price per piece whatever unit each quote uses, and both prices on the same trade term, so you can see which is lower."
        breadcrumbs={breadcrumbs}
      />

      <section className={`section section--spacious ${base.toolSection}`}>
        <div className="container">
          <ScrollReveal>
            <form className={extra.inputs} onSubmit={(ev) => ev.preventDefault()} aria-label="Two quotations">
              <QuotePanel name="A" quote={values.a} onChange={(a) => setValues((v) => ({ ...v, a }))} />
              <QuotePanel name="B" quote={values.b} onChange={(b) => setValues((v) => ({ ...v, b }))} />
              <div className={`${base.panel} ${extra.shared}`}>
                <h2 className={base.panelTitle}>The order</h2>
                <div className={base.grid2}>
                  <Field
                    id="order-quantity"
                    label="Quantity"
                    unit="pieces"
                    value={values.quantity}
                    onChange={(quantity) => setValues((v) => ({ ...v, quantity }))}
                    hint="The same quantity for both quotations."
                  />
                  <Field
                    id="order-freight"
                    label="Freight and insurance"
                    unit="whole order, optional"
                    value={values.freight}
                    onChange={(freight) => setValues((v) => ({ ...v, freight }))}
                    hint="From your freight forwarder. Needed only to compare an FOB quote with a CIF one."
                  />
                </div>
                <p className={base.note}>
                  The figures above are a hypothetical example so the page is never empty. They are not
                  our prices. Replace them with the two quotations you are comparing, in the same currency.
                </p>
              </div>
            </form>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className={`${base.results} ${extra.resultsBlock}`} aria-live="polite">
              <h2 className={base.panelTitle}>Result</h2>
              {result.error ? (
                <p className={base.error} role="alert">{result.error}</p>
              ) : (
                <>
                  <p className={extra.verdict}>
                    {result.cheaper === null
                      ? 'On a CIF basis the two quotations come to the same price.'
                      : `On a CIF basis quotation ${result.cheaper} is lower by ${fmt(result.cifGap.total)} on the order, ${fmt(result.cifGap.perPiece)} a piece or ${fmt(result.cifGap.pct, 1)}%.`}
                  </p>
                  {result.asWritten.cheaper && !result.needsFreight && (
                    <p className={extra.sub}>
                      As written, quotation {result.asWritten.cheaper} looks {fmt(result.asWritten.perPiece)} a piece lower.
                      {result.termsDiffer ? ' The rest of the gap is freight and insurance.' : ''}
                    </p>
                  )}
                  {result.needsFreight && (
                    <p className={base.error} role="alert">
                      One quotation is FOB and the other CIF, but no freight and insurance figure is
                      entered, so they are not on the same basis. Add the figure for the whole order.
                    </p>
                  )}
                  {lightHeavy && (
                    <p className={extra.warn}>
                      The towels differ in weight: quotation {lightHeavy.lighter} is lighter by about{' '}
                      {fmt(lightHeavy.gap, 0)}%. A lower price per piece can mean less cotton, so read the
                      price per kilogram row as well.
                    </p>
                  )}

                  <div className={base.tableWrap}>
                    <table className={base.table}>
                      <caption className="sr-only">Quotation A and quotation B on one basis</caption>
                      <thead>
                        <tr>
                          <th scope="col">&nbsp;</th>
                          <th scope="col">Quotation A</th>
                          <th scope="col">Quotation B</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">Trade term quoted</th>
                          {result.rows.map((r) => <td key={r.name}>{r.term}</td>)}
                        </tr>
                        <tr>
                          <th scope="row">Weight of one towel</th>
                          {result.rows.map((r) => (
                            <td key={r.name}>{r.grams === null ? 'not entered' : `about ${fmt(r.grams, 0)} g`}</td>
                          ))}
                        </tr>
                        <tr>
                          <th scope="row">Price per piece, as quoted</th>
                          {result.rows.map((r) => <td key={r.name}>{fmt(r.perPiece)}</td>)}
                        </tr>
                        <tr>
                          <th scope="row">Price per dozen, as quoted</th>
                          {result.rows.map((r) => <td key={r.name}>{fmt(r.perDozen)}</td>)}
                        </tr>
                        <tr>
                          <th scope="row">Price per kilogram, as quoted</th>
                          {result.rows.map((r) => (
                            <td key={r.name}>{r.perKg === null ? 'not entered' : fmt(r.perKg)}</td>
                          ))}
                        </tr>
                        <tr>
                          <th scope="row">Per piece on FOB basis</th>
                          {result.rows.map((r) => <td key={r.name}>{fmt(r.fobPerPiece)}</td>)}
                        </tr>
                        <tr>
                          <th scope="row">Per piece on CIF basis</th>
                          {result.rows.map((r) => <td key={r.name}>{fmt(r.cifPerPiece)}</td>)}
                        </tr>
                        <tr>
                          <th scope="row">Order total, FOB basis</th>
                          {result.rows.map((r) => <td key={r.name}>{fmt(r.fobTotal)}</td>)}
                        </tr>
                        <tr>
                          <th scope="row">Order total, CIF basis</th>
                          {result.rows.map((r) => <td key={r.name}>{fmt(r.cifTotal)}</td>)}
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className={base.note}>
                    An estimate to compare quotations, not a quotation. It leaves out import duty, taxes,
                    customs clearance, delivery to your warehouse and bank charges, which depend on your
                    country and the declared value: add them to every quotation you compare. Confirm each
                    supplier’s piece weight and its tolerance, and check a sample against the specification.
                  </p>
                </>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className={`section section--spacious ${base.methodSection}`}>
        <div className="container">
          <ScrollReveal>
            <SectionHeading eyebrow="How it is worked out" title="The arithmetic, in full." />
          </ScrollReveal>
          <div className={base.method}>
            <ScrollReveal>
              <h3>Weight of one towel</h3>
              <p>
                Length × width (in metres) × GSM. A 70 × 140 cm towel at 500 GSM is 0.7 × 1.4 × 500 =
                490 g. Borders, hems and the weight tolerance move the finished figure a little.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.06}>
              <h3>Price per piece</h3>
              <p>
                A price per piece is used as it is. A price per dozen is divided by 12. A price per
                kilogram is multiplied by the weight of one towel in kilograms.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.12}>
              <h3>One trade term</h3>
              <p>
                An FOB quotation becomes a CIF one by adding the freight and insurance you enter. A CIF
                quotation becomes an FOB one by taking it off. Both are then compared on the same term.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className={`section section--spacious ${base.faqSection}`}>
        <div className="container">
          <ScrollReveal>
            <SectionHeading eyebrow="Frequently asked" title="Before you rely on the number." />
          </ScrollReveal>
          <div className={base.faqList}>
            {FAQS.map((f, i) => (
              <ScrollReveal key={f.q} delay={i * 0.05} className={base.faqItem}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${base.guidesSection}`}>
        <div className="container">
          <ScrollReveal>
            <SectionHeading eyebrow="Read next" title="Guides that go with this." />
          </ScrollReveal>
          <ul className={base.guideList}>
            {GUIDES.map((g) => (
              <li key={g.href}>
                <Link to={g.href}>{g.label}</Link>
              </li>
            ))}
            <li>
              <Link to="/tools/towel-container-calculator">Free tool: towel container loading and weight calculator</Link>
            </li>
          </ul>
        </div>
      </section>

      <CTASection
        eyebrow="Compare with ours"
        title="Send us the quotation you are comparing."
        lead="Tell us the specification, quantity and port from the quotation you have. Our export team replies within 24 hours with an FOB quotation on the same basis: piece weight, price per piece and the named port."
        emailSubject="Quotation comparison — Kiran Global Exports"
        primaryHref="/contact"
        primaryLabel="Contact Our Export Team"
        secondaryHref="/collections"
        secondaryLabel="Browse Collections"
        note="Typical response within 24 hours"
      />
    </>
  );
}
