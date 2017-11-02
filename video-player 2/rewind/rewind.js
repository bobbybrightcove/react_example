import { PLAYER } from '../../../constants';

export default function rewind(currentTime) {
  const newTime = currentTime - PLAYER.REWIND_AMOUNT || 0;

  return newTime >= 0 ? newTime : 0;
}
