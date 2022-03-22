import { CommonProps } from "./common/common";

export interface Concert extends CommonProps {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  categoryId: number;
  user: number;
  coverImage: string;
  title: string;
  artist: string;
  detail: string;
  content: string;
  isPublic: boolean;
  allConcertStartDate: Date;
  allConcertEndDate: Date;
}

export type CreateConcertData = Pick<Concert, "coverImage" | "title" | "artist" | "detail" | "content" | "categoryId" | "allConcertStartDate" | "allConcertEndDate">;

// export type CreateConcertData = {

// }
