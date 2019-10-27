const AllButMSB = 0x7f;
const JustMSB = 0x80;

export function decode(bytes: number[]) {
  const result: number[] = [];
  let num = 0;
  let currentShift = 0;
  for (const byte of bytes) {
    const current = byte & AllButMSB;
    num |= current << currentShift;
    currentShift += 7;

    if ((byte & JustMSB) !== JustMSB) {
      result.push(num);
      num = 0;
      currentShift = 0;
    }
  }

  return result;
}
