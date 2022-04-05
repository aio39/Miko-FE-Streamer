// Const
export const Message = "message";
export const Quiz = "quiz";
export const Ranking = "ranking";
export const Information = "information";
export const GetChannel = "GetChannel";
export const Sell = "Sell";
export const Chart = "Chart";
export type WindowType = typeof Message | typeof Quiz | typeof Information | typeof Ranking | typeof GetChannel | typeof Sell | typeof Chart;

//
export const categoryArray = ["J-POP", "K-POP", "アニメ", "ジャズ", "バンド", "バラード"];
export const chType = ["チャージ", "チケット購入", "SC送り", "アイテム使用", "グッズ購入", "チケット販売", "グッズ販売", "SC受け", "アイテム受け"];
export const chChargeIdx = 0;
export const chTicketBuyIdx = 1;
export const chSuperChatSendIdx = 2;
export const chDoneItemSendIdx = 3;
export const chGoodsBuyIdx = 4;
export const chTicketSoldIdx = 5;
export const chGoodsSoldIdx = 6;
export const chSuperChatSendedIdx = 7;
export const chSuperDoneItemSendedIdx = 8;

export const S3_URL = "https://miko-image.s3.ap-northeast-2.amazonaws.com/";

//ENV
const ENV_PREFIX = "REACT_APP_";

export const LARAVEL_URL = process.env[ENV_PREFIX + "LARAVEL_URL"] ?? "http://localhost:8080/api/";
export const NEST_URL = process.env[ENV_PREFIX + "NEST_URL"] ?? "http://localhost:3001/api";
export const SOCKET_URL = process.env[ENV_PREFIX + "SOCKET_SERVER"] ?? "http://localhost:3002";
