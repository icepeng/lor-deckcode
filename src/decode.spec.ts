import { decode } from './decode';

describe('Decode', () => {
  it('should return an array of cards', () => {
    expect(decode('CEBAIAIFB4WDANQIAEAQGDAUDAQSIJZUAIAQCBIFAEAQCBAA')).toStrictEqual([
      { code: '01SI015', count: 3 },
      { code: '01SI044', count: 3 },
      { code: '01SI048', count: 3 },
      { code: '01SI054', count: 3 },
      { code: '01FR003', count: 3 },
      { code: '01FR012', count: 3 },
      { code: '01FR020', count: 3 },
      { code: '01FR024', count: 3 },
      { code: '01FR033', count: 3 },
      { code: '01FR036', count: 3 },
      { code: '01FR039', count: 3 },
      { code: '01FR052', count: 3 },
      { code: '01SI005', count: 2 },
      { code: '01FR004', count: 2 },
    ]);
  });

  it('should return an array of cards', () => {
    expect(decode('CEBAEAIBAQTQMAIAAILSQLBNGUBACAIBFYDACAAHBEHR2IBLAEBACAIFAY')).toStrictEqual([
      { code: '01FR004', count: 3 },
      { code: '01FR039', count: 3 },
      { code: '01DE002', count: 3 },
      { code: '01DE023', count: 3 },
      { code: '01DE040', count: 3 },
      { code: '01DE044', count: 3 },
      { code: '01DE045', count: 3 },
      { code: '01DE053', count: 3 },
      { code: '01FR046', count: 2 },
      { code: '01DE007', count: 2 },
      { code: '01DE009', count: 2 },
      { code: '01DE015', count: 2 },
      { code: '01DE029', count: 2 },
      { code: '01DE032', count: 2 },
      { code: '01DE043', count: 2 },
      { code: '01FR005', count: 1 },
      { code: '01FR006', count: 1 },
    ]);
  });
});
