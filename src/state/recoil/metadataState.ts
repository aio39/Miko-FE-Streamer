import { MetaData } from "@src/types/TimeMetadataFormat";
import { atom, selector } from "recoil";

export const metadataListFilterSearchState = atom({
  key: "metadataListFilterSearchState",
  default: "",
});

export const metadataListFilterTagState = atom({
  key: "metadataListFilterTagState",
  default: "",
});

export const metadataListFilterUsedState = atom<"all" | "used" | "notUsed">({
  key: "metadataListFilterUsedState",
  default: "all",
});

export const metadataListFilterState = selector({
  key: "metadataListFilterState",
  get: ({ get }) => {
    return {
      search: get(metadataListFilterSearchState),
      tag: get(metadataListFilterTagState),
      used: get(metadataListFilterUsedState),
    };
  },
});

export const metadataState = atom<Array<MetaData>>({
  key: "metadataState",
  default: [],
});
