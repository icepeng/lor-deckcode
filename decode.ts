import * as Base32 from './base32';
import * as Varint from './varint';

export function decode(deckCode: string): Array<[string, number]> {
  const [firstByte, ...otherBytes] = Base32.decode(deckCode);
  const version = firstByte & 0xf;
  if (version > 1) {
    throw new Error(
      `Requires higher version of this library. library - 1, provided - ${version}`,
    );
  }

  const integers = Varint.decode(otherBytes);
  return [];
}

decode('CEBAIAIFAEHSQNQIAEAQGDAUDAQSOKJUAIAQCBI5AEAQCFYA');
