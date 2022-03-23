export type WindowType = typeof Message | typeof Quiz | typeof Information | typeof Ranking | typeof GetChannel;

// Const
export const Message = "message";
export const Quiz = "quiz";
export const Ranking = "ranking";
export const Information = "information";
export const GetChannel = "GetChannel";

//
export const categoryArray = ["J-POP", "K-POP", "애니메이션", "재즈/소울", "밴드", "발라드"];
export const S3_URL = "https://miko-image.s3.ap-northeast-2.amazonaws.com/";

//ENV
const ENV_PREFIX = "REACT_APP_";

export const LARAVEL_URL = process.env[ENV_PREFIX + "LARAVEL_URL"] ?? "http://localhost:8080/api/";
export const NEST_URL = process.env[ENV_PREFIX + "NEST_URL"] ?? "http://localhost:3001/api";
export const SOCKET_URL = process.env[ENV_PREFIX + "SOCKET_SERVER"] ?? "http://localhost:3002";
