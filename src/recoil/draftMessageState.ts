import { atom } from 'recoil';
import { MessageMetadata } from '../types/TimeMetadataFormat';

const initMessageMetadata: MessageMetadata = {
  d: 'm',
  mt: '',
  st: undefined,
  u: undefined,
  a: 0,
  bc: '#ffffff',
  mtc: '#000000',
  stc: '#000000',
  p: 1,
  s: 5,
};

const draftMessageState = atom<MessageMetadata>({
  key: 'draftMessage',
  default: initMessageMetadata,
});

export { draftMessageState, initMessageMetadata };
