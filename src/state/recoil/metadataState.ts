import { atom } from 'recoil';
import { MetaData } from 'types/TimeMetadataFormat';

const metadataState = atom<Array<MetaData>>({
  key: 'metadata',
  default: [],
});

export { metadataState };
