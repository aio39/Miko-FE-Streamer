import { S3_IVS_URL } from "@src/const";

const THUMBNAIL_INTERVAL_S = 60;

export const generateIvsM3U8 = (prefix: string) => `${S3_IVS_URL}/${prefix}/media/hls/m3u8`;

export const generateIvsThumbUrl = (prefix: string, idx: number) => `${S3_IVS_URL}/${prefix}/media/thumbnails/thumb${idx}.jpg`;

// 0 부터 시작함.
export const calculateLastThumbnail = (start: string, end: string) => {
  const starTimeStampS = new Date(start).getTime() / 1000;
  const endTimeStampS = new Date(end).getTime() / 1000;

  const lastThumbNum = Math.floor((endTimeStampS - starTimeStampS) / THUMBNAIL_INTERVAL_S);
  return lastThumbNum;
};
