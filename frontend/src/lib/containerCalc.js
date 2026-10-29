// The arithmetic behind /tools/towel-container-calculator. Plain functions,
// no React, so the same numbers can be checked outside the page.

// Typical internal dimensions of the three containers buyers ask about, in
// centimetres. Builders differ by a few centimetres, so the page says
// "typical". The volumes (about 33, 67 and 76 cubic metres) are the ones
// the container loading guide already quotes.
export const CONTAINERS = [
  { id: '20', label: '20ft standard', length: 590, width: 235, height: 239 },
  { id: '40', label: '40ft standard', length: 1203, width: 235, height: 239 },
  { id: '40hc', label: '40ft high-cube', length: 1203, width: 235, height: 269 },
];

const positive = (n) => Number.isFinite(n) && n > 0;

/** Weight of one towel in grams: area in square metres times GSM. */
export function towelWeightGrams(lengthCm, widthCm, gsm) {
  if (![lengthCm, widthCm, gsm].every(positive)) return null;
  return ((lengthCm * widthCm) / 10000) * gsm;
}

/**
 * How many cartons of a given size fit in a container, packed in straight
 * rows, columns and tiers. All six ways of standing the carton are tried and
 * the best is kept. `unusablePct` takes off space the load cannot use.
 * This is the upper end of what a real load reaches.
 */
export function cartonsThatFit(container, carton, unusablePct = 0) {
  const dims = [carton.length, carton.width, carton.height];
  if (!dims.every(positive)) return null;
  const [a, b, c] = dims;
  const orientations = [
    [a, b, c], [a, c, b], [b, a, c], [b, c, a], [c, a, b], [c, b, a],
  ];
  let best = 0;
  for (const [x, y, z] of orientations) {
    const count =
      Math.floor(container.length / x) *
      Math.floor(container.width / y) *
      Math.floor(container.height / z);
    if (count > best) best = count;
  }
  const keep = Math.min(Math.max(1 - (Number(unusablePct) || 0) / 100, 0), 1);
  return Math.floor(best * keep);
}

export const volumeM3 = (dims) => (dims.length * dims.width * dims.height) / 1e6;

/**
 * Everything the page shows, from the raw inputs. Returns { error } when an
 * input cannot be used, so the page never prints a number from a blank.
 */
export function calculate(input) {
  const n = (v) => Number.parseFloat(v);
  const towel = { length: n(input.towelLength), width: n(input.towelWidth), gsm: n(input.gsm) };
  const carton = { length: n(input.cartonLength), width: n(input.cartonWidth), height: n(input.cartonHeight) };
  const perCarton = Math.floor(n(input.piecesPerCarton));
  const packingKg = input.packingKg === '' || input.packingKg == null ? 0 : n(input.packingKg);
  const unusable = input.unusablePct === '' || input.unusablePct == null ? 0 : n(input.unusablePct);
  const target = input.targetPieces === '' || input.targetPieces == null ? null : Math.floor(n(input.targetPieces));

  if (![towel.length, towel.width, towel.gsm, carton.length, carton.width, carton.height].every(positive)) {
    return { error: 'Enter the towel size, GSM and carton size as numbers above zero.' };
  }
  if (!positive(perCarton)) return { error: 'Enter how many towels go in one carton.' };
  if (!Number.isFinite(packingKg) || packingKg < 0) return { error: 'Packing weight cannot be negative.' };
  if (!Number.isFinite(unusable) || unusable < 0 || unusable >= 100) {
    return { error: 'Unusable space must be between 0 and 99 per cent.' };
  }
  if (target !== null && !positive(target)) return { error: 'Target quantity must be a number above zero, or left empty.' };

  const gramsPerTowel = towelWeightGrams(towel.length, towel.width, towel.gsm);
  const cartonKg = (perCarton * gramsPerTowel) / 1000 + packingKg;
  const cartonVol = volumeM3(carton);
  const cartonsNeeded = target === null ? null : Math.ceil(target / perCarton);

  const containers = CONTAINERS.map((container) => {
    const cartons = cartonsThatFit(container, carton, unusable);
    const capacity = volumeM3(container);
    return {
      ...container,
      capacityM3: capacity,
      cartons,
      pieces: cartons * perCarton,
      spaceUsedPct: (cartons * cartonVol) / capacity * 100,
      grossKg: cartons * cartonKg,
      containersNeeded: cartonsNeeded === null || cartons === 0 ? null : Math.ceil(cartonsNeeded / cartons),
    };
  });

  return { gramsPerTowel, cartonKg, cartonVol, cartonsNeeded, containers };
}
