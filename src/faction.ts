export const fromID: Record<number, string> = {
  0: 'DE',
  1: 'FR',
  2: 'IO',
  3: 'NX',
  4: 'PZ',
  5: 'SI',
  6: 'BW'
};

export const fromCode = Object.entries(fromID).reduce(
  (obj, [key, value]) => {
    obj[value] = parseInt(key, 10);
    return obj;
  },
  {} as Record<string, number>,
);
