import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';

const TIMELINE = 'timeline';

const TimeLine = () => {
  useEffect(() => {
    const canvas = document.getElementById(TIMELINE) as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = 'rgb(200,0,0)';
      ctx.fillRect(10, 10, 50, 50);

      ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
      ctx.fillRect(30, 30, 50, 50);
    } else {
      alert('Canvas를 지원하지 않음.');
    }

    return () => {};
  }, []);

  return (
    <Box w="full" h="full">
      <canvas id={TIMELINE} width="full" height="full">
        TimeLine
      </canvas>
    </Box>
  );
};

export default TimeLine;
