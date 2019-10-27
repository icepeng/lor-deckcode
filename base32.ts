const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
const dictionary = alphabet.split('').reduce(
  (dict, char, index) => {
    dict[char] = index;
    return dict;
  },
  {} as Record<string, number>,
);

export function decode(encoded: string) {
  const resultLength = Math.floor((encoded.length * 5) / 8);
  const result: number[] = Array.from({ length: resultLength });

  let buffer = 0;
  let index = 0;
  let left = 0;

  for (const char of encoded.split('')) {
    buffer <<= 5;
    buffer |= dictionary[char] & 31;
    left += 5;

    if (left >= 8) {
      left -= 8;
      result[index] = (buffer >> left) & 0xff;
      index += 1;
    }
  }

  return result;
}
