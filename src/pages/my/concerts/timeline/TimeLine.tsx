import { Box } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useEffect, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { concertDataState } from 'state/recoil/concertDataState';
import { Concert } from 'types/share/Concert';

const TIMELINE = 'timeline';

const SECOND = 1000;
const MINUTE = 60000;
const HOUR = 3600000;

const TL_WIDTH = 15;

const TimeLine = () => {
  const concertData = useRecoilValue(concertDataState);
  const { all_concert_end_date, all_concert_start_date } =
    concertData as Concert;
  const aDayjs = useMemo(() => {
    return dayjs(all_concert_start_date);
  }, [concertData]);

  const bDayjs = useMemo(() => {
    return dayjs(all_concert_end_date);
  }, [concertData]);

  console.log(aDayjs.toString());
  console.log(bDayjs.toString());

  const lineCount =
    Math.floor((all_concert_end_date - all_concert_start_date) / MINUTE) + 2;

  useEffect(() => {
    const canvas = document.getElementById(TIMELINE) as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      let count = 0;

      for (
        let i = all_concert_start_date;
        i < all_concert_end_date;
        i += MINUTE
      ) {
        if (count % 5 === 0) {
          const iDayJs = dayjs(i);

          ctx.font = '14px serif';
          ctx.fillText(
            `${iDayJs.get('hour')}:${iDayJs.get('minute')}`,
            14 + count * TL_WIDTH,
            16
          );
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(30 + count * TL_WIDTH, 20);
          ctx.lineTo(30 + count * TL_WIDTH, 30);
          ctx.stroke();
        }
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(30 + count * TL_WIDTH, 20);
        ctx.lineTo(30 + count * TL_WIDTH, 160);
        ctx.stroke();
        count += 1;
      }
    } else {
      alert('Canvas를 지원하지 않음.');
    }

    return () => {};
  }, []);

  return (
    <Box w="full" h="full" overflowX="scroll">
      <canvas id={TIMELINE} width={lineCount * TL_WIDTH} height="400">
        TimeLine
      </canvas>
    </Box>
  );
};

export default TimeLine;
