import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
dayjs.extend(timezone);

const FORMAT = {
  YMD: "YYYY/MM/DD",
  YMDHM: "YYYY/MM/DD A hh:mm",
  YMDHMS: "YYYY/MM/DD A hh:mm:ss",
  HMS: "A hh:mm:ss",
  ISO8601NoZ: "YYYY-MM-DDTHH:mm:ss",
};
// NOTE HH를 hh로 써서 차트 데이터가 이상했음.

const convertDate = (data: dayjs.ConfigType, format: keyof typeof FORMAT = "YMD") => {
  return dayjs(data).format(FORMAT[format]);
};

export const convertDateUTC = (data: dayjs.ConfigType, format: keyof typeof FORMAT = "YMD") => {
  return dayjs.utc(data).format(FORMAT[format]);
};

export default convertDate;
