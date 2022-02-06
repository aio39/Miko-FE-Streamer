import { atom } from 'recoil';
import { MetadataFormats } from '../types/TimeMetadataFormat';

const metadataState = atom<Array<MetadataFormats>>({
  key: 'metadata',
  default: [],
});

export { metadataState };
