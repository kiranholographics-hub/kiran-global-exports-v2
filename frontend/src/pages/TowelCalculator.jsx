import { useMemo, useState } from 'react';
import Link from '@/components/Link/Link';
import SEO from '@/components/SEO/SEO';
import PageIntro from '@/components/PageIntro/PageIntro';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import SectionHeading from '@/components/SectionHeading/SectionHeading';
import CTASection from '@/components/CTASection/CTASection';
import { calculate } from '@/lib/containerCalc';
import styles from './TowelCalculator.module.css';

// Worked example values, shown so the page is never blank. They are not a
// recommendation: carton size and pieces per carton depend on how a buyer's
// towels are folded and packed.
const EXAMPLE = {
  towelLength: '70',
  towelWidth: '140',
  gsm: '500',
  piecesPerCarton: '24',
  cartonLength: '60',
  cartonWidth: '45',
  cartonHeight: '40',
  packingKg: '0.5',
  unusablePct: '0',
  targetPieces: '',
};

const FAQS = [
  {
    q: 'How many towels fit in a 40ft container?',
    a: 'There is no single figure. It depends on how the towels are folded and packed into cartons, the size of the carton and how the cartons are stacked. Enter your carton size and pieces per carton above for an estimate. Our export team confirms the loadable quantity against your specification before you commit to an order.',
  },
  {
    q: 'Is a towel shipment limited by space or by weight?',
    a: 'For terry towels it is usually space. Cotton terry is bulky for its weight, so a container tends to fill before it reaches its weight limit. The calculator shows both the space used and the gross weight, so you can compare the weight with the limit your carrier sets.',
  },
  {
    q: 'How is the weight of a towel worked out from its GSM?',
    a: 'GSM is grams per square metre of cloth. Multiply the towel’s area in square metres by its GSM: a 70 × 140 cm towel is 0.98 square metres, so at 500 GSM it is 490 g. A finished towel differs a little because of the borders, hems and weight tolerance, so treat the figure as an estimate and confirm it against the specification sheet.',
  },
  {
    q: 'Are the container sizes exact?',
    a: 'They are typical internal dimensions. Containers differ by a few centimetres between builders, and doors, pallets or loading gaps take up some space, which is why there is an unusable space box. Treat the result as the upper end of what a real load reaches and confirm it with your freight forwarder.',
  },
];

const GUIDES = [
  { href: '/updates/container-loading-for-towels', label: 'Container loading for towels: what actually decides what fits' },
  { href: '/updates/hotel-towel-gsm-guide', label: '400, 500 and 600 GSM towels: which is right for a hotel' },
  { href: '/updates/towel-minimum-order-quantity-explained', label: 'Towel minimum order quantity, explained' },
  { href: '/updates/reading-a-towel-spec-sheet', label: 'How to read a towel spec sheet' },
];

const fmt = (n, digits = 0) =>
  n.toLocaleString('en-GB', { minimumFractionDigits: digits, maximumFractionDigits: digits });

function Field({ id, label, unit, value, onChange, hint }) {
  return (
    <div className={styles.field}>
      <label htmlFor={id}>
        {label} {unit && <span className={styles.unit}>({unit})</span>}
      </label>
      <input
        id={id}
        type="text"
        inputMode="decimal"
        autoComplete="off"
        value={value}
        onChange={(ev) => onChange(ev.target.value)}
      />
      {hint && <p className={styles.fieldHint}>{hint}</p>}
    </div>
  );
}

/* ═══════════════════════════════════════════════ */
export default function TowelCalculator() {
  const [values, setValues] = useState(EXAMPLE);
  const set = (key) => (value) => setValues((v) => ({ ...v, [key]: value }));
  const result = useMemo(() => calculate(values), [values]);

  return (
    <>
      <SEO
        title="Towel Container Loading & Weight Calculator"
        description="Free calculator for towel importers: how many cartons fit in a 20ft, 40ft or 40ft high-cube container, and what a towel and a shipment weigh from size and GSM."
        faqs={FAQS}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Export', href: '/export' },
          { label: 'Towel container calculator' },
        ]}
      />

      <PageIntro
        eyebrow="Free tool"
        title="Towel container loading and weight calculator."
        lead="Work out how many cartons fit in a 20ft, 40ft or 40ft high-cube container, and what a towel and a full load weigh, from the towel size, the GSM and your carton."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Export', href: '/export' },
          { label: 'Towel container calculator' },
        ]}
      />

      <section className={`section section--spacious ${styles.toolSection}`}>
        <div className="container">
          <div className={styles.layout}>
            <ScrollReveal>
              <form className={styles.panel} onSubmit={(ev) => ev.preventDefault()} aria-label="Towel and carton details">
                <h2 className={styles.panelTitle}>The towel</h2>
                <div className={styles.grid3}>
                  <Field id="towel-length" label="Length" unit="cm" value={values.towelLength} onChange={set('towelLength')} />
                  <Field id="towel-width" label="Width" unit="cm" value={values.towelWidth} onChange={set('towelWidth')} />
                  <Field id="towel-gsm" label="GSM" value={values.gsm} onChange={set('gsm')} />
                </div>

                <h2 className={styles.panelTitle}>The carton</h2>
                <div className={styles.grid3}>
                  <Field id="carton-length" label="Length" unit="cm" value={values.cartonLength} onChange={set('cartonLength')} />
                  <Field id="carton-width" label="Width" unit="cm" value={values.cartonWidth} onChange={set('cartonWidth')} />
                  <Field id="carton-height" label="Height" unit="cm" value={values.cartonHeight} onChange={set('cartonHeight')} />
                </div>
                <div className={styles.grid2}>
                  <Field
                    id="pieces"
                    label="Towels per carton"
                    value={values.piecesPerCarton}
                    onChange={set('piecesPerCarton')}
                    hint="Depends on how tightly they are folded and packed."
                  />
                  <Field
                    id="packing"
                    label="Carton and packing weight"
                    unit="kg"
                    value={values.packingKg}
                    onChange={set('packingKg')}
                    hint="Empty carton, polybags, labels."
                  />
                </div>

                <h2 className={styles.panelTitle}>The load</h2>
                <div className={styles.grid2}>
                  <Field
                    id="unusable"
                    label="Space you cannot use"
                    unit="%"
                    value={values.unusablePct}
                    onChange={set('unusablePct')}
                    hint="Door gap, pallets, uneven stacking. 0 shows the upper end."
                  />
                  <Field
                    id="target"
                    label="Quantity you want to order"
                    unit="pieces, optional"
                    value={values.targetPieces}
                    onChange={set('targetPieces')}
                    hint="Shows how many containers that takes."
                  />
                </div>
                <p className={styles.note}>
                  The figures above are an example so the page is never empty. Replace them with your own.
                </p>
              </form>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <div className={styles.results} aria-live="polite">
                <h2 className={styles.panelTitle}>Result</h2>
                {result.error ? (
                  <p className={styles.error} role="alert">{result.error}</p>
                ) : (
                  <>
                    <dl className={styles.facts}>
                      <div>
                        <dt>One towel</dt>
                        <dd>about {fmt(result.gramsPerTowel)} g</dd>
                      </div>
                      <div>
                        <dt>One full carton</dt>
                        <dd>about {fmt(result.cartonKg, 1)} kg</dd>
                      </div>
                      <div>
                        <dt>One carton takes</dt>
                        <dd>{fmt(result.cartonVol, 3)} m³</dd>
                      </div>
                      {result.cartonsNeeded !== null && (
                        <div>
                          <dt>Cartons for your quantity</dt>
                          <dd>{fmt(result.cartonsNeeded)}</dd>
                        </div>
                      )}
                    </dl>

                    <div className={styles.tableWrap}>
                      <table className={styles.table}>
                        <caption className="sr-only">Cartons, pieces and weight by container</caption>
                        <thead>
                          <tr>
                            <th scope="col">Container</th>
                            <th scope="col">Cartons</th>
                            <th scope="col">Towels</th>
                            <th scope="col">Space used</th>
                            <th scope="col">Gross weight</th>
                            {result.cartonsNeeded !== null && <th scope="col">For your quantity</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {result.containers.map((c) => (
                            <tr key={c.id}>
                              <th scope="row">
                                {c.label}
                                <span className={styles.sub}>{fmt(c.capacityM3, 1)} m³</span>
                              </th>
                              <td>{fmt(c.cartons)}</td>
                              <td>{fmt(c.pieces)}</td>
                              <td>{fmt(c.spaceUsedPct)}%</td>
                              <td>{fmt(c.grossKg)} kg</td>
                              {result.cartonsNeeded !== null && (
                                <td>
                                  {c.containersNeeded === null
                                    ? 'does not fit'
                                    : `${fmt(c.containersNeeded)} × ${c.label}`}
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <p className={styles.note}>
                      An estimate, not a quotation. Cartons are stacked in straight rows, columns and
                      tiers in the best of six orientations, so a real load is usually at or below this.
                      Check the gross weight against your carrier’s limit. Our export team confirms the
                      loadable quantity against your specification before you order.
                    </p>
                  </>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className={`section section--spacious ${styles.methodSection}`}>
        <div className="container">
          <ScrollReveal>
            <SectionHeading eyebrow="How it is worked out" title="The arithmetic, in full." />
          </ScrollReveal>
          <div className={styles.method}>
            <ScrollReveal>
              <h3>Weight of one towel</h3>
              <p>
                Length × width (in metres) × GSM. A 70 × 140 cm towel at 500 GSM is 0.7 × 1.4 × 500 =
                490 g. Borders, hems and the weight tolerance in the specification move the finished
                figure a little.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.06}>
              <h3>Cartons in a container</h3>
              <p>
                For each of the six ways a carton can stand, the container’s length, width and height
                are divided by the carton’s, rounded down, and multiplied together. The best of the six
                is kept, then reduced by the unusable space you enter.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.12}>
              <h3>Container sizes</h3>
              <p>
                Typical internal sizes: 20ft 5.90 × 2.35 × 2.39 m, 40ft 12.03 × 2.35 × 2.39 m and
                40ft high-cube 12.03 × 2.35 × 2.69 m. Builders differ by a few centimetres.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className={`section section--spacious ${styles.faqSection}`}>
        <div className="container">
          <ScrollReveal>
            <SectionHeading eyebrow="Frequently asked" title="Before you rely on the number." />
          </ScrollReveal>
          <div className={styles.faqList}>
            {FAQS.map((f, i) => (
              <ScrollReveal key={f.q} delay={i * 0.05} className={styles.faqItem}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.guidesSection}`}>
        <div className="container">
          <ScrollReveal>
            <SectionHeading eyebrow="Read next" title="Guides that go with this." />
          </ScrollReveal>
          <ul className={styles.guideList}>
            {GUIDES.map((g) => (
              <li key={g.href}>
                <Link to={g.href}>{g.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection
        eyebrow="Container quote"
        title="Send us your specification."
        lead="Tell us the product, size, GSM, quantity and container size you need. Our export team confirms the carton specification and the loadable quantity, and replies within 24 hours with an FOB quotation."
        emailSubject="Container loading enquiry — Kiran Global Exports"
        primaryHref="/contact"
        primaryLabel="Contact Our Export Team"
        secondaryHref="/collections"
        secondaryLabel="Browse Collections"
        note="Typical response within 24 hours"
      />
    </>
  );
}
