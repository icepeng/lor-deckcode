import { decode } from './decode';

describe('Decode', () => {
  it('should return an array of cards', () => {
    expect(
      decode(
        'CEAAECABAQJRWHBIFU2DOOYIAEBAMCIMCINCILJZAICACBANE4VCYBABAILR2HRL',
      ),
    ).toStrictEqual([
      ['01PZ019', 2],
      ['01PZ027', 2],
      ['01PZ028', 2],
      ['01PZ040', 2],
      ['01PZ045', 2],
      ['01PZ052', 2],
      ['01PZ055', 2],
      ['01PZ059', 2],
      ['01IO006', 2],
      ['01IO009', 2],
      ['01IO012', 2],
      ['01IO018', 2],
      ['01IO026', 2],
      ['01IO036', 2],
      ['01IO045', 2],
      ['01IO057', 2],
      ['01PZ013', 1],
      ['01PZ039', 1],
      ['01PZ042', 1],
      ['01PZ044', 1],
      ['01IO023', 1],
      ['01IO029', 1],
      ['01IO030', 1],
      ['01IO043', 1],
    ]);
  });
});
