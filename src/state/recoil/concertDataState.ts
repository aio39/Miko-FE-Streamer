import { atom } from 'recoil';
import { Concert } from 'types/share/Concert';

const concertDataState = atom<Concert | undefined>({
  key: 'concertData',
  default: undefined,
});

export { concertDataState };
