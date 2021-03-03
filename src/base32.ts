const DIGITS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'.split('');
const CHAR_MAP  = DIGITS.reduce(
  (dict, char, index) => {
    dict[char] = index;
    return dict;
  },
  {} as Record<string, number>,
);
const SHIFT = numberOfTrailingZeros(DIGITS.length);
const SEPARATOR = "-";
const MASK = DIGITS.length -1;



function numberOfTrailingZeros(i: number): number
{
    // HD, Figure 5-14
    let y: number;
    if (i == 0) return 32;
    let n = 31;
    y = i << 16; if (y != 0) { n = n - 16; i = y; }
    y = i << 8; if (y != 0) { n = n - 8; i = y; }
    y = i << 4; if (y != 0) { n = n - 4; i = y; }
    y = i << 2; if (y != 0) { n = n - 2; i = y; }
    return n - ((i << 1) >> 31);
}
export function decode(encoded: string) {
  // Remove whitespace and separators
  encoded = encoded.trim().replace(SEPARATOR, '');

  // Remove padding. Note: the padding is used as hint to determine how many
  // bits to decode from the last incomplete chunk (which is commented out
  // below, so this may have been wrong to start with).
  encoded = encoded.replace("[=]*$", "");

  // Canonicalize to all upper case
  encoded = encoded.toUpperCase();
  if (encoded.length == 0)
  {
      return [0];
  }

  let encodedLength = encoded.length;
  let outLength = encodedLength * SHIFT / 8;
  let result: number[] = [];
  let buffer = 0;
  let next = 0;
  let bitsLeft = 0;
  encoded.split('').forEach(c => {
    if (CHAR_MAP[c] !== 0 && !CHAR_MAP[c]) {
        throw Error("Illegal character: " + c);
    }
    buffer <<= SHIFT;
    buffer |= CHAR_MAP[c] & MASK;
    bitsLeft += SHIFT;
    if (bitsLeft >= 8)
    {
        result[next++] = (buffer >> (bitsLeft - 8));
        bitsLeft -= 8;
    }
  }); 
  // We'll ignore leftover bits for now.
  //
  // if (next != outLength || bitsLeft >= SHIFT) {
  //  throw new DecodingException("Bits left: " + bitsLeft);
  // }
  return result;
}

export function encode(data: number[], padOutput: boolean = false) {
  if (data.length === 0) {
    return '';
  }

  // SHIFT is the number of bits per output character, so the length of the
  // output is the length of the input multiplied by 8/SHIFT, rounded up.
  if (data.length >= 1 << 28) {
    // The computation below will fail, so don't do it.
    throw new RangeError('Array is too long for this');
  }

  const outputLength = (data.length * 8 + SHIFT - 1) / SHIFT;
  const result = []; //new Array(outputLength);

  let buffer = data[0];
  let next = 1;
  let bitsLeft = 8;
  while (bitsLeft > 0 || next < data.length) {
    if (bitsLeft < SHIFT ) {
      if (next < data.length) {
        buffer <<= 8;
        buffer |= data[next++] & 0xff;
        bitsLeft += 8;
      } else {
        const pad = SHIFT  - bitsLeft;
        buffer <<= pad;
        bitsLeft += pad;
      }
    }
    const index = MASK & (buffer >> (bitsLeft - SHIFT));
    bitsLeft -= SHIFT;
    result.push(DIGITS[index]);
  }

  if (padOutput)
  {
      let padding = 8 - (result.length % 8);
      if (padding > 0) result.push(`=${padding == 8 ? 0 : padding}`);
  }

  return result.join('');
}
