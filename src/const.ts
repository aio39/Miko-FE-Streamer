export const Message = 'message';
export const Quiz = 'quiz';
export const Ranking = 'ranking';
export const Information = 'information';
export const GetChannel = 'GetChannel';

export type WindowType =
  | typeof Message
  | typeof Quiz
  | typeof Information
  | typeof Ranking;

export const LARAVEL_URL = 'http://localhost:8080/api/';
export const NODE_URL = 'http://localhost:3001/api/';
export const S3_URL = 'https://marusuku.s3.ap-northeast-2.amazonaws.com/';

export const categoryArray = ['콘서트', '음악'];
