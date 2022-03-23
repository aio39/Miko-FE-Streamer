import { Box } from "@chakra-ui/react";
import { ResponsiveLine } from "@nivo/line";
import { useData } from "@src/state/swr/useData";
import { ConcertAddedScorePerTime } from "@src/types/entity/ConcertAddedScorePerTime";
import { FC } from "react";

const ScoreAddedChart: FC = () => {
  const { data } = useData<ConcertAddedScorePerTime>("/data/caspt", { start: "2022-03-21T14:18:00", end: "2022-03-21T16:18:00" });

  if (!data) return <Box>Error</Box>;

  if (data.data.length === 0) return <Box>No Data</Box>;

  return (
    <Box width="full" h="40vh">
      차트
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
          min: 0,
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

export default ScoreAddedChart;

const data = [
  {
    id: "fake corp. A",
    data: [
      { x: "2018-01-01", y: 7 },
      { x: "2018-01-02", y: 5 },
      { x: "2018-01-03", y: 11 },
      { x: "2018-01-04", y: 9 },
      { x: "2018-01-05", y: 12 },
      { x: "2018-01-06", y: 16 },
      { x: "2018-01-07", y: 13 },
      { x: "2018-01-08", y: 13 },
    ],
  },
  {
    id: "fake corp. B",
    data: [
      { x: "2018-01-04", y: 14 },
      { x: "2018-01-05", y: 14 },
      { x: "2018-01-06", y: 15 },
      { x: "2018-01-07", y: 11 },
      { x: "2018-01-08", y: 10 },
      { x: "2018-01-09", y: 12 },
      { x: "2018-01-10", y: 9 },
      { x: "2018-01-11", y: 7 },
    ],
  },
];
