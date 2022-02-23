import { CommonProps } from './common/commo';

export interface Concert extends CommonProps {
  category_id: number;
  user_id: number;
  cover_image: string;
  title: string;
  artist: string;
  detail: string;
  content: string;
  is_public: number;
  all_concert_start_date: number;
  all_concert_end_date: number;
}

export type CreateConcertData = Pick<
  Concert,
  | 'cover_image'
  | 'title'
  | 'artist'
  | 'detail'
  | 'content'
  | 'category_id'
  | 'all_concert_end_date'
  | 'all_concert_start_date'
>;
