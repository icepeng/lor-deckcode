import { encode } from './encode';
import { TEST_DATA } from './testset';

describe('Encode', () => {
  for (const { code, deck } of TEST_DATA) {
    it('should return a deck code', () => {
      expect(encode(deck)).toEqual(code);
    });
  }
});
