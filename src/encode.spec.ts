import { encode } from './encode';

describe('Encode', () => {
  it('should return a deck code', () => {
    expect(
      encode([
        { code: '01PZ019', count: 2 },
        { code: '01PZ027', count: 2 },
        { code: '01PZ028', count: 2 },
        { code: '01PZ040', count: 2 },
        { code: '01PZ045', count: 2 },
        { code: '01PZ052', count: 2 },
        { code: '01PZ055', count: 2 },
        { code: '01PZ059', count: 2 },
        { code: '01IO006', count: 2 },
        { code: '01IO009', count: 2 },
        { code: '01IO012', count: 2 },
        { code: '01IO018', count: 2 },
        { code: '01IO026', count: 2 },
        { code: '01IO036', count: 2 },
        { code: '01IO045', count: 2 },
        { code: '01IO057', count: 2 },
        { code: '01PZ013', count: 1 },
        { code: '01PZ039', count: 1 },
        { code: '01PZ042', count: 1 },
        { code: '01PZ044', count: 1 },
        { code: '01IO023', count: 1 },
        { code: '01IO029', count: 1 },
        { code: '01IO030', count: 1 },
        { code: '01IO043', count: 1 },
      ]),
    ).toEqual('CEAAECABAQJRWHBIFU2DOOYIAEBAMCIMCINCILJZAICACBANE4VCYBABAILR2HRL');
  });
});
