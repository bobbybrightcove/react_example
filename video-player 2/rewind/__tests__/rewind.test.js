import rewind from '../rewind';
import { PLAYER } from '../../../../constants';

describe('rewind()', () => {
  it(`should return currentTime - ${PLAYER.REWIND_AMOUNT}`, () => {
    const currentTime = PLAYER.REWIND_AMOUNT * 2;
    const newTime = currentTime - PLAYER.REWIND_AMOUNT;
    expect(rewind(currentTime)).toBe(newTime);
  });
  it('should return 0 if rewind time is less than zero', () => {
    const currentTime = PLAYER.REWIND_AMOUNT - 5;
    const newTime = 0;
    expect(rewind(currentTime)).toBe(newTime);
  });
});
