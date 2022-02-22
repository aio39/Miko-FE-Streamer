export const Message = 'message';
export const Quiz = 'quiz';
export const Ranking = 'ranking';
export const Information = 'information';

export type WindowType =
  | typeof Message
  | typeof Quiz
  | typeof Information
  | typeof Ranking;

export const LARAVEL_URL = 'http://localhost:8080/api/';
export const S3_URL = 'https://marusuku.s3.ap-northeast-2.amazonaws.com/';
