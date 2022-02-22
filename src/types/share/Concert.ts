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
  all_concert_start_date: string;
  all_concert_end_date: string;
}

export type CreteUserData = Pick<
  Concert,
  'cover_image' | 'title' | 'artist' | 'detail' | 'content'
>;
