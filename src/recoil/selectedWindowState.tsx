import { atom } from 'recoil';
import { Message } from '../const';

const selectedWindowState = atom({
  key: 'selectedWindow',
  default: Message,
});


export { selectedWindowState };

