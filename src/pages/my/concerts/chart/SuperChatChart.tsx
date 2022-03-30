import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { ResponsiveLine } from "@nivo/line";
import convertDate, { convertDateUTC } from "@src/helper/convertDate";
import { useData } from "@src/state/swr/useData";
import { ConcertAddedScorePerTime } from "@src/types/entity/ConcertAddedScorePerTime";
import dayjs, { ManipulateType } from "dayjs";
import { FC, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const SuperChatChart: FC = () => {
  const startRef = useRef(dayjs().subtract(1, "h"));
  const endRef = useRef(dayjs().add(1, "h"));
  const { ticketId } = useParams();
  const [start, setStart] = useState(convertDateUTC(startRef.current, "ISO8601NoZ"));
  const [end, setEnd] = useState(convertDateUTC(endRef.current, "ISO8601NoZ"));
  console.log(start, end);
  const { data } = useData<ConcertAddedScorePerTime>("/data/ctascpt", { start, end, filter: [["ticket_id", ticketId as string]] });

  if (!data) return <Box>Error</Box>;

  if (data.data.length === 0) return <Box>No Data</Box>;

  const handleSetTime = (value: number, unit: ManipulateType) => {
    // NOTE dayjs immutable하다
    startRef.current = startRef.current.add(value, unit);
    endRef.current = endRef.current.add(value, unit);
    setStart(convertDateUTC(startRef.current, "ISO8601NoZ"));
    setEnd(convertDateUTC(endRef.current, "ISO8601NoZ"));
  };

  return (
    <Box width="full" h="40vh">
      <Heading>スーパーチャット</Heading>
      <Text>
        {convertDate(startRef.current, "YMDHM")} ~ {convertDate(endRef.current, "YMDHM")}{" "}
      </Text>
      <Button onClick={() => handleSetTime(-1, "h")}> -1H </Button>
      <Button onClick={() => handleSetTime(1, "h")}> +1H </Button>
      <ResponsiveLine
        // 반드시 포맷을 지켜야함.
        data={[{ data: data.data, id: "score" }]}
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
        margin={{ top: 50, right: 160, bottom: 50, left: 60 }}
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
        colors={{ scheme: "nivo" }}
        lineWidth={1}
        pointSize={4}
        pointColor={{ theme: "background" }}
        pointBorderWidth={1}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
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
  );
};

export default SuperChatChart;
