import { MetaData } from "@src/types/TimeMetadataFormat";
import { atom } from "recoil";

const metadataState = atom<Array<MetaData>>({
  key: "metadata",
  default: [],
});

export { metadataState };
