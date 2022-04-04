import { Box, Button, Center, Heading, Spinner, Text } from "@chakra-ui/react";
import { ResponsiveLineCanvas } from "@nivo/line";
import convertDate, { convertDateUTC } from "@src/helper/convertDate";
import { useData } from "@src/state/swr/useData";
import { ConcertAddedScorePerTime } from "@src/types/entity/ConcertAddedScorePerTime";
import dayjs, { ManipulateType } from "dayjs";
import { FC, Suspense, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const LEFT_MARGIN = 60;

const Loading = () => {
  return (
    <Center w="full" h="full">
      <Spinner size="lg" />
    </Center>
  );
};

const Chart: FC<{ start: string; end: string; type: string }> = ({ end, start, type }) => {
  const [left, setLeft] = useState(100);
  const { ticketId } = useParams();
  const { data } = useData<ConcertAddedScorePerTime>(`/data/${type}`, { start, end, filter: [["ticket_id", ticketId as string]] });

  const newData = useMemo(() => {
    if (data) {
      const newList: Pick<ConcertAddedScorePerTime, "x" | "y">[] = [];
      data.data.forEach((value, idx) => {
        const { x, y } = value;

        //   길이가 1인 경우 대비.
        const supplementEndLeak = () => {
          if (idx === data.data.length - 1) {
            const diff = dayjs(end + "Z").diff(value.x, "m");
            if (diff > 0) {
              const dayLastData = dayjs(value.x);
              new Array(diff).fill(0).forEach((_, idx) => {
                newList.push({ x: convertDateUTC(dayLastData.add(idx + 1, "m"), "ISO8601NoZ") + ".000000Z", y: 0 });
              });
            }
          }
        };

        if (idx === 0) {
          // NOTE start에 z 붙여줘야함.
          const diff = dayjs(value.x).diff(start + "Z", "m");
          if (diff > 0) {
            const dayStart = dayjs(start + "Z");
            new Array(diff).fill(0).forEach((_, idx) => {
              newList.push({ x: convertDateUTC(dayStart.add(idx + 1, "m"), "ISO8601NoZ") + ".000000Z", y: 0 });
            });
          }
          newList.push({ x, y });
          supplementEndLeak();
          return;
        }
        const a = data.data[idx - 1].x;
        const b = data.data[idx].x;
        const dayA = dayjs(a).set("s", 0); // 전꺼
        const dayB = dayjs(b).set("s", 0); // 현재
        const diff = dayB.diff(dayA, "m") - 1;

        if (diff > 0) {
          new Array(diff).fill(0).forEach((_, idx) => {
            newList.push({ x: convertDateUTC(dayA.add(idx + 1, "m"), "ISO8601NoZ") + ".000000Z", y: 0 });
          });
        }
        newList.push({ x, y });

        supplementEndLeak();
      });
      // console.log("-----------");
      // console.log(data.data);
      // console.log(newList);
      // console.log("-----------");

      return newList;
    }
  }, [data, start, end]);

  if (!newData) return <Box>Error</Box>;
  if (!data) return <Box>Error</Box>;

  return (
    <>
      {data.data.length === 0 ? (
        <Box>No Data</Box>
      ) : (
        <Box position="relative" w="full" h="full">
          <Box position="absolute" left={left + "px"} w="1px" h="full" bgColor="black"></Box>

          <ResponsiveLineCanvas
            onClick={(point, e) => {
              // console.log("onClick", point, e);
              setLeft(point.x + LEFT_MARGIN);
            }}
            data={[{ data: newData, id: "score" }]}
            xScale={{
              type: "time",
              //   format: "%Y-%m-%d",
              format: "%Y-%m-%dT%H:%M:%S.000000Z",
              //   format: "%Y-%m-%dT%t:18:00.000000Z",
              precision: "minute",
            }}
            xFormat="time:%Y-%m-%dT%H:%M:%S"
            yScale={{
              type: "linear",
              stacked: false, // ?
              min: "auto",
              max: "auto",
            }}
            // yFormat=" >-.2f"
            curve="step"
            enableArea={false}
            margin={{ top: 5, right: 50, bottom: 50, left: LEFT_MARGIN }}
            axisTop={null}
            axisRight={{
              tickValues: [0, 500, 1000, 1500, 2000, 2500],
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              format: ".2s",
              legend: "",
              legendOffset: 0,
            }}
            axisBottom={{
              //   tickValues: [0, 20, 40, 60, 80, 100, 120],
              tickValues: "every 5 minutes",
              tickSize: 10,
              tickPadding: 20,
              tickRotation: 40,
              format: "%H:%M",

              //   legend: "price",
              //   legendOffset: 36,
              //   legendPosition: "middle",
            }}
            axisLeft={{
              tickValues: [0, 500, 1000, 1500, 2000, 2500],
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              format: ".2s",
              legend: "score",
              legendOffset: -40,
              legendPosition: "middle",
            }}
            enableGridX={true}
            enableGridY={true}
            colors={{ scheme: "set1" }}
            lineWidth={1}
            pointSize={4}
            pointColor={{ theme: "background" }}
            pointBorderWidth={1}
            pointBorderColor={{ from: "colserieColor" }}
            // pointLabelYOffset={-12}
            // useMesh={true}
            gridXValues={[0, 20, 40, 60, 80, 100, 120]}
            gridYValues={[0, 500, 1000, 1500, 2000, 2500]}
            // 레전드
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 140,
                translateY: 0,
                itemsSpacing: 2,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 12,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        </Box>
      )}
    </>
  );
};

const ScoreAddedChart: FC = () => {
  const startRef = useRef(dayjs().subtract(1, "h"));
  const endRef = useRef(dayjs().add(1, "h"));

  const [start, setStart] = useState(convertDateUTC(startRef.current, "ISO8601NoZ"));
  const [end, setEnd] = useState(convertDateUTC(endRef.current, "ISO8601NoZ"));

  const handleSetTime = (value: number, unit: ManipulateType) => {
    // NOTE dayjs immutable하다
    startRef.current = startRef.current.add(value, unit);
    endRef.current = endRef.current.add(value, unit);
    setStart(convertDateUTC(startRef.current, "ISO8601NoZ"));
    setEnd(convertDateUTC(endRef.current, "ISO8601NoZ"));
  };

  return (
    <Box width="full" h="50vh" mb="150px">
      <Heading>スコア増加値</Heading>
      {/* <Button onClick={handleDraw}>draw</Button> */}
      <Text>
        {convertDate(startRef.current, "YMDHM")} ~ {convertDate(endRef.current, "YMDHM")}{" "}
      </Text>
      <Button onClick={() => handleSetTime(-1, "h")}> -1H </Button>
      <Button onClick={() => handleSetTime(1, "h")}> +1H </Button>
      <Suspense fallback={<Loading />}>
        <Chart start={start} end={end} type="caspt" />
      </Suspense>
    </Box>
  );
};

export default ScoreAddedChart;
