import { atom, selector } from 'recoil';
import { MessageMetadata } from '../types/TimeMetadataFormat';

const draftMsgBoxDataState = atom<MessageMetadata['boxData']>({
  key: 'draftMsgBoxData',
  default: {
    width: 200,
    height: 100,
    round: 10,
    padding: 10,
    spacing: 10,
    hexColor: '#FFFFFF',
  },
});

const initMsgMainTextData = {
  text: '',
  size: 20,
  bold: 600,
  font: 'serif',
  hexColor: '#111111',
};

const draftMsgMainTextState = atom<MessageMetadata['mainTextData']>({
  key: 'draftMsgMainText',
  default: initMsgMainTextData,
});

const draftMsgSubTextState = atom<MessageMetadata['subTextData']>({
  key: 'draftMsgSubText',
  default: initMsgMainTextData,
});

const draftMsgPositionState = atom<MessageMetadata['positionIndex']>({
  key: 'draftPosition',
  default: 1,
});

const draftMsgUrlState = atom<MessageMetadata['urlString']>({
  key: 'draftUrl',
  default: undefined,
});

const draftMsgAnimationTypeState = atom<MessageMetadata['animationType']>({
  key: 'draftAnimationype',
  default: undefined,
});

const draftMsgTimeDurationState = atom<MessageMetadata['durationTime']>({
  key: 'draftTimeDuration',
  default: 5,
});

// const draftMsg123State = atom<MessageMetadata['']>({
//   key: 'draft123',
//   default: undefined,
// });
// const draftMessageState = atom<MessageMetadata>({
//   key: 'draftMessage',
//   default: initMessageMetadata,
// });

const draftMsgIsHasSubTextState = selector<boolean>({
  key: 'draftMsgIsHasSubText',
  get: ({ get }) => {
    return !!get(draftMsgSubTextState);
  },
});

const draftMsgState = selector<MessageMetadata>({
  key: 'draftMessage',
  get: ({ get }) => {
    return {
      dataType: 'm',
      boxData: get(draftMsgBoxDataState),
      positionIndex: get(draftMsgPositionState),
      mainTextData: get(draftMsgMainTextState),
      subTextData: get(draftMsgSubTextState),
      urlString: get(draftMsgUrlState),
      animationType: get(draftMsgAnimationTypeState),
      durationTime: get(draftMsgTimeDurationState),
    };
  },
  set: ({ set }, newValue) => {},
  // set: ({ set }, newValue) =>
  //   set(myAtom, newValue instanceof DefaultValue ? newValue : newValue / 100),
});

export {
  draftMsgState,
  draftMsgBoxDataState,
  draftMsgMainTextState,
  draftMsgSubTextState,
  draftMsgPositionState,
  draftMsgUrlState,
  draftMsgAnimationTypeState,
  draftMsgTimeDurationState,
  draftMsgIsHasSubTextState,
};
