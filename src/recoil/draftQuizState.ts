import { atom } from 'recoil';
import { QuizMetadata } from '../types/TimeMetadataFormat';

const initQuizMetadata: QuizMetadata = {
  d: 'q',
  mt: undefined,
  t: 30,
  s: new Array(0).fill(undefined),
};

const draftQuizState = atom<QuizMetadata>({
  key: 'draftQuiz',
  default: initQuizMetadata,
});

export { draftQuizState, initQuizMetadata };
