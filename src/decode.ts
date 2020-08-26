import * as Base32 from './base32';
import * as Varint from './varint';
import { fromID } from './faction';
import { Card } from './card.interface';

export function decode(deckCode: string): Card[] {
  const [firstByte, ...otherBytes] = Base32.decode(deckCode);
  const version = firstByte & 0xf;
  if (version > 3) {
    throw new Error(`Requires higher version of this library. library - 1, provided - ${version}`);
  }

  const integers = Varint.decode(otherBytes).reverse();
  const stack: Array<['SET_FACTION_FOLLOWING' | 'CARD_FOLLOWING' | 'CARD_NUMBER', Card]> = [
    ['SET_FACTION_FOLLOWING', { code: '', count: 1 }],
    ['SET_FACTION_FOLLOWING', { code: '', count: 2 }],
    ['SET_FACTION_FOLLOWING', { code: '', count: 3 }],
  ];
  const result: Card[] = [];

  while (stack.length > 0) {
    const [type, card] = stack.pop()!;
    switch (type) {
      case 'SET_FACTION_FOLLOWING':
        const setFactionFollwing = integers.pop()!;
        for (let i = 0; i < setFactionFollwing; i += 1) {
          stack.push(['CARD_FOLLOWING', { code: '', count: card.count }]);
        }
        break;
      case 'CARD_FOLLOWING':
        const cardFollowing = integers.pop()!;
        const set = integers
          .pop()!
          .toString()
          .padStart(2, '0');
        const faction = fromID[integers.pop()!];
        for (let i = 0; i < cardFollowing; i += 1) {
          stack.push(['CARD_NUMBER', { code: set + faction, count: card.count }]);
        }
        break;
      case 'CARD_NUMBER':
        const cardNumber = integers
          .pop()!
          .toString()
          .padStart(3, '0');
        result.push({ code: card.code + cardNumber, count: card.count });
        break;
    }
  }

  return result;
}
