import { Message } from '@src/const';
import { atom } from 'recoil';

const selectedWindowState = atom({
  key: 'selectedWindow',
  default: Message,
});

export { selectedWindowState };
