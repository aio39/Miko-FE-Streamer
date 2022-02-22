import { Box } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useEffect, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { concertDataState } from 'state/recoil/concertDataState';

const TIMELINE = 'timeline';

const SECOND = 1000;
const MINUTE = 60000;
const HOUR = 3600000;

const TL_WIDTH = 15;

const TimeLine = () => {
  const concertData = useRecoilValue(concertDataState);
  const { start_at, end_at } = concertData;
  const aDayjs = useMemo(() => {
    return dayjs(start_at);
  }, [concertData]);

  const bDayjs = useMemo(() => {
    return dayjs(end_at);
  }, [concertData]);

  console.log(aDayjs.toString());
  console.log(bDayjs.toString());

  const lineCount = Math.floor((end_at - start_at) / MINUTE) + 2;

  useEffect(() => {
    const canvas = document.getElementById(TIMELINE) as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      let count = 0;

      for (let i = start_at; i < end_at; i += MINUTE) {
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
