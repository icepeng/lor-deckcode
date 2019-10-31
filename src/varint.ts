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

function get(value: number): number[] {
  const result: number[] = [];

  if (value === 0) {
    return [0];
  }

  while (value !== 0) {
    let byteVal = value & AllButMSB;
    value >>>= 7;

    if (value !== 0) {
      byteVal |= JustMSB;
    }

    result.push(byteVal);
  }

  return result;
}

export function encode(integers: number[]) {
  return integers.map(get).reduce((arr, x) => [...arr, ...x], []);
}
