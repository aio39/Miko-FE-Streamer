import { atom } from 'recoil';
import { ConcertData } from '../types/ConcertData';

const concertDataState = atom<ConcertData>({
  key: 'concertData',
  default: {
    start_at: 1644230400000,
    end_at: 1644241200000,
  },
});

export { concertDataState };
