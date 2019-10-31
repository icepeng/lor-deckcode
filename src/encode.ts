import { Card } from './card.interface';
import { fromCode } from './faction';
import * as Base32 from './base32';
import * as Varint from './varint';

export function encode(cards: Card[]): string {
  const result = Base32.encode([
    0x11,
    ...Varint.encode(
      [3, 2, 1].map(count => groupCards(cards.filter(x => x.count === count))).reduce((arr, x) => [...arr, ...x], []),
    ),
  ]);

  return result;
}

function parseCode(code: string) {
  const set = parseInt(code.slice(0, 2), 10);
  const faction = fromCode[code.slice(2, 4)];
  const number = parseInt(code.slice(4, 7), 10);
  return {
    code,
    set,
    faction,
    number,
  };
}

function groupCards(cards: Card[]) {
  const groups = Object.values(
    cards.reduce(
      (obj, card) => {
        const setFaction = card.code.slice(0, 4);
        if (!obj[setFaction]) {
          obj[setFaction] = [];
        }
        obj[setFaction].push(parseCode(card.code));
        return obj;
      },
      {} as Record<string, Array<{ code: string; set: number; faction: number; number: number }>>,
    ),
  );

  return groups
    .sort((a, b) => a.length - b.length)
    .map(group => group.sort((a, b) => a.code.localeCompare(b.code)))
    .map(group => [group.length, group[0].set, group[0].faction, ...group.map(x => x.number)])
    .reduce((arr, x) => [...arr, ...x], [groups.length]);
}
