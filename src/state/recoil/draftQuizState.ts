import { atom, DefaultValue, selector } from "recoil";
import { QuizMetaData } from "./../../types/TimeMetadataFormat";

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

const draftQuizMainTitleState = atom<string>({
  key: "draftQuizMainTitleState",
  default: "",
});

const draftQuizChoicesState = atom<string[]>({
  key: "draftQuizChoices",
  default: [],
});

const draftQuizCreatedAtState = atom<number>({
  key: "draftQuizCreatedAtState",
  default: -1,
});

const draftQuizTagsState = atom<string[]>({
  key: "draftQuizTagsState",
  default: [],
});

const draftQuizTitleState = atom<string>({
  key: "draftQuizTitleState",
  default: "",
});

const draftQuizState = selector<QuizMetaData>({
  key: "draftQuiz",
  get: ({ get }) => {
    return {
      data: {
        dataType: "q",
        mainText: get(draftQuizMainTitleState),
        durationTime: get(draftQuizDurationTimeState),
        choices: get(draftQuizChoicesState),
      },
      type: "q",
      tags: get(draftQuizTagsState),
      title: get(draftQuizTitleState),
      createdAt: get(draftQuizCreatedAtState),
    };
  },
  set: ({ set, reset }, data) => {
    console.log("set quize", data);
    if (data instanceof DefaultValue) {
      console.log("draftQuizState selector reset", data);
      reset(draftQuizMainTitleState);
      reset(draftQuizDurationTimeState);
      reset(draftQuizChoicesState);
      reset(draftQuizTagsState);
      reset(draftQuizTitleState);
      reset(draftQuizCreatedAtState);
    } else {
      set(draftQuizMainTitleState, data.data.mainText);
      set(draftQuizDurationTimeState, data.data.durationTime);
      set(draftQuizChoicesState, data.data.choices);
      set(draftQuizTagsState, data.tags);
      set(draftQuizTitleState, data.title);
      set(draftQuizCreatedAtState, data.createdAt);
    }
  },
});

export { draftQuizState, draftQuizDurationTimeState, draftQuizMainTitleState, draftQuizChoicesState };
