const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'.split('');
const dictionary = alphabet.reduce(
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

export function encode(data: number[]) {
  if (data.length === 0) {
    return '';
  }
  if (data.length >= 1 << 28) {
    throw new RangeError('Array is too long for this');
  }

  const outputLength = Math.floor((data.length * 8 + 5 - 1) / 5);
  const result = new Array(outputLength);

  let buffer = data[0];
  let next = 1;
  let bitsLeft = 8;
  while (bitsLeft > 0 || next < data.length) {
    if (bitsLeft < 5) {
      if (next < data.length) {
        buffer <<= 8;
        buffer |= data[next++] & 0xff;
        bitsLeft += 8;
      } else {
        const pad = 5 - bitsLeft;
        buffer <<= pad;
        bitsLeft += pad;
      }
    }
    const index = 31 & (buffer >> (bitsLeft - 5));
    bitsLeft -= 5;
    result.push(alphabet[index]);
  }

  return result.join('');
}
