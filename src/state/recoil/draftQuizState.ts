import { atom } from 'recoil';
import { QuizMetadata } from 'types/TimeMetadataFormat';

// const initQuizMetadata: QuizMetadata = {
// dataType: 'q',
// mt: undefined,
// t: 30,
// s: new Array(0).fill(undefined),
// };

const draftQuizState = atom<QuizMetadata>({
  key: 'draftQuiz',
  default: {
    dataType: 'q',
    mainText: undefined,
    durationTime: 30,
    choices: new Array(0).fill(undefined),
  },
});

export { draftQuizState };