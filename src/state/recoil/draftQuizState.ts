import { QuizMetadata } from "@src/types/TimeMetadataFormat";
import { atom, selector } from "recoil";

// const initQuizMetadata: QuizMetadata = {
// dataType: 'q',
// mt: undefined,
// t: 30,
// s: new Array(0).fill(undefined),
// };

const draftQuizDurationTimeState = atom<number>({
  key: "draftQuizDurationTime",
  default: 30,
});

const draftQuizMainTextState = atom<string>({
  key: "draftQuizMainText",
  default: "",
});

const draftQuizChoicesState = atom<string[]>({
  key: "draftQuizChoices",
  default: [],
});

const draftQuizState = selector<QuizMetadata>({
  key: "draftQuiz",
  get: ({ get }) => {
    return {
      dataType: "q",
      mainText: get(draftQuizMainTextState),
      durationTime: get(draftQuizDurationTimeState),
      choices: get(draftQuizChoicesState),
    };
  },
});

export { draftQuizState, draftQuizDurationTimeState, draftQuizMainTextState, draftQuizChoicesState };
