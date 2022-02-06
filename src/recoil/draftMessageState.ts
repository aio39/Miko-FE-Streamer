import { atom } from 'recoil';
import { MessageMetadata } from '../types/TimeMetadataFormat';

const initMessageMetadata: MessageMetadata = {
  mt: '', //"큰 타이틀",
  st: undefined, //  "서브 내용",
  u: undefined, // "클릭시 링크",
  a: 0, // "애니메이션 타입 1,2,3,4,5",
  bc: '#ffffff', // "배경 색",
  mtc: '#000000', // "텍스트 색",
  stc: '#000000', // "텍스트 색",
  p: 1, //  "위치 1~9",
  s: 5, //  "사이즈"
};

const draftMessageState = atom<MessageMetadata>({
  key: 'draftMessage',
  default: initMessageMetadata,
});

export { draftMessageState };
