// The arithmetic behind /tools/towel-quotation-comparison. Plain functions,
// no React, so the numbers can be checked outside the page.
//
// Two towel quotations are put on one basis: the weight of one towel, the
// price per piece (whatever unit each quote uses), and one trade term, by
// adding the freight and insurance the buyer enters to any FOB quote. It
// uses no prices of ours: every number comes from the buyer.

import { towelWeightGrams } from './containerCalc';

export const UNITS = [
  { id: 'piece', label: 'per piece' },
  { id: 'dozen', label: 'per dozen' },
  { id: 'kg', label: 'per kilogram' },
];

export const TERMS = [
  { id: 'FOB', label: 'FOB — Indian port' },
  { id: 'CIF', label: 'CIF — your port' },
];

const positive = (n) => Number.isFinite(n) && n > 0;
const num = (v) => Number.parseFloat(v);
const blank = (v) => v === '' || v == null;

/** One quote reduced to a price per piece on its own trade term. */
function priceOf(quote, name) {
  const price = num(quote.price);
  if (!positive(price)) return { error: `Enter the price in quote ${name} as a number above zero.` };

  const length = num(quote.length);
  const width = num(quote.width);
  const gsm = num(quote.gsm);
  const grams = [length, width, gsm].every(positive) ? towelWeightGrams(length, width, gsm) : null;

  let perPiece;
  if (quote.unit === 'piece') perPiece = price;
  else if (quote.unit === 'dozen') perPiece = price / 12;
  else if (quote.unit === 'kg') {
    if (grams === null) {
      return { error: `Quote ${name} is priced per kilogram, so enter its towel size and GSM to find the price of one towel.` };
    }
    perPiece = price * (grams / 1000);
  } else return { error: `Choose what the price in quote ${name} is per.` };

  return { perPiece, grams };
}

/**
 * Compares two quotes. Returns { error } when an input cannot be used, so
 * the page never prints a number from a blank.
 */
export function compareQuotes(input) {
  const quantity = Math.floor(num(input.quantity));
  if (!positive(quantity)) return { error: 'Enter the quantity as a whole number above zero.' };

  const freight = blank(input.freight) ? 0 : num(input.freight);
  if (!Number.isFinite(freight) || freight < 0) {
    return { error: 'Freight and insurance cannot be negative. Leave it empty if you do not have a figure.' };
  }

  const a = priceOf(input.a, 'A');
  if (a.error) return { error: a.error };
  const b = priceOf(input.b, 'B');
  if (b.error) return { error: b.error };

  const rows = [
    { name: 'A', term: input.a.term, ...a },
    { name: 'B', term: input.b.term, ...b },
  ].map((q) => {
    const quotedTotal = q.perPiece * quantity;
    // FOB and CIF totals for the same order. A FOB quote becomes CIF by
    // adding the freight and insurance; a CIF quote becomes FOB by taking
    // them off. A quote already on the term asked for is left as it is.
    const fobTotal = q.term === 'FOB' ? quotedTotal : quotedTotal - freight;
    const cifTotal = q.term === 'CIF' ? quotedTotal : quotedTotal + freight;
    const kg = q.grams === null ? null : (q.grams / 1000) * quantity;
    return {
      ...q,
      quantity,
      quotedTotal,
      fobTotal,
      cifTotal,
      cifPerPiece: cifTotal / quantity,
      fobPerPiece: fobTotal / quantity,
      perDozen: q.perPiece * 12,
      // Price of the cloth itself, so a lighter towel at a lower price per
      // piece shows up as dearer per kilogram.
      perKg: q.grams === null ? null : q.perPiece / (q.grams / 1000),
      totalKg: kg,
    };
  });

  const [ra, rb] = rows;
  if (rows.some((r) => r.fobTotal <= 0)) {
    return { error: 'The freight and insurance figure is as large as a CIF quote, which leaves nothing for the goods. Check that it is for the whole order.' };
  }
  const sameTerm = ra.term === rb.term;
  const termsDiffer = !sameTerm;
  const needsFreight = termsDiffer && freight === 0;

  // Compared on CIF: the basis on which both quotes include freight. A gap
  // under 0.05 of a currency unit per hundred pieces is treated as a tie.
  const diff = rb.cifTotal - ra.cifTotal;
  const tied = Math.abs(diff) / quantity < 0.0005;
  const cheaper = tied ? null : diff > 0 ? 'A' : 'B';
  const cheaperRow = cheaper === 'A' ? ra : cheaper === 'B' ? rb : null;

  // The same comparison with no trade-term conversion, to show how far the
  // price as written is from the price on one basis.
  const asWrittenDiff = rb.perPiece - ra.perPiece;

  return {
    rows,
    quantity,
    freight,
    termsDiffer,
    needsFreight,
    cheaper,
    cifGap: cheaperRow ? { total: Math.abs(diff), perPiece: Math.abs(diff) / quantity, pct: (Math.abs(diff) / cheaperRow.cifTotal) * 100 } : null,
    asWritten: { perPiece: Math.abs(asWrittenDiff), cheaper: asWrittenDiff === 0 ? null : asWrittenDiff > 0 ? 'A' : 'B' },
  };
}
