import { Box, Button, Text } from "@chakra-ui/react";
import { ResponsivePie } from "@nivo/pie";
import { pushMetaData } from "@src/helper/pushMetaData";
import { nodeFetcher } from "@src/state/swr/fetcher";
import laggy from "@src/state/swr/middleware/laggy";
import { useTicket } from "@src/state/swr/useTickets";
import { QuizMainMetadata, QuizMetaData } from "@src/types/TimeMetadataFormat";
import { FC, Suspense } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";

const data = [
  {
    id: "ruby",
    label: "ruby",
    value: 273,
    color: "hsl(123, 70%, 50%)",
  },
  {
    id: "sass",
    label: "sass",
    value: 20,
    color: "hsl(258, 70%, 50%)",
  },
  {
    id: "go",
    label: "go",
    value: 40,
    color: "hsl(289, 70%, 50%)",
  },
  {
    id: "hack",
    label: "hack",
    value: 41,
    color: "hsl(305, 70%, 50%)",
  },
  {
    id: "python",
    label: "python",
    value: 90,
    color: "hsl(304, 70%, 50%)",
  },
];

type QuizRedisData = {
  "0": number;
  "1": number;
  "2": number;
  "3": number;
};

const QUIZ_RESULT_POLLING_MS = 2500;

const MyResponsivePie: FC<{ id: number; data: QuizMainMetadata }> = ({ id, data }) => {
  // useMemo(() => {}, [d])
  const params = useParams();
  const { data: ticketData, mutate } = useTicket(parseInt(params.ticketId as string));
  const { data: redisData } = useSWR<QuizRedisData>(`/concerts/quiz/${id}`, nodeFetcher, {
    use: [laggy],
    refreshInterval: QUIZ_RESULT_POLLING_MS,
    suspense: true,
  });

  //         {
  //     id: "python",
  //     label: "python",
  //     value: 90,
  //     color: "hsl(304, 70%, 50%)",
  //   },
  console.log("redis", redisData);

  if (!redisData || !ticketData) return <Box> no data</Box>;

  const result = data.choices.map((choice, idx) => {
    return {
      id: choice,
      label: choice,
      // @ts-ignore
      value: redisData[idx + ""] ?? 0,
    };
  });

  const handleSendResult = () => {
    pushMetaData(ticketData.data.channelArn, { data: { choices: result, title: data.mainText, durationTime: 10 }, type: "qr" });
  };

  return (
    <>
      <ResponsivePie
        data={result}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        colors={{ scheme: "pastel2" }}
        defs={
          [
            //   {
            //     id: "dots",
            //     type: "patternDots",
            //     background: "inherit",
            //     color: "rgba(255, 255, 255, 0.3)",
            //     size: 4,
            //     padding: 1,
            //     stagger: true,
            //   },
            //   {
            //     id: "lines",
            //     type: "patternLines",
            //     background: "inherit",
            //     color: "rgba(255, 255, 255, 0.3)",
            //     rotation: -45,
            //     lineWidth: 6,
            //     spacing: 10,
            //   },
          ]
        }
        fill={
          [
            //   {
            //     match: {
            //       id: "ruby",
            //     },
            //     id: "dots",
            //   },
            //   {
            //     match: {
            //       id: "c",
            //     },
            //     id: "dots",
            //   },
            //   {
            //     match: {
            //       id: "go",
            //     },
            //     id: "dots",
            //   },
            //   {
            //     match: {
            //       id: "python",
            //     },
            //     id: "dots",
            //   },
            //   {
            //     match: {
            //       id: "scala",
            //     },
            //     id: "lines",
            //   },
            //   {
            //     match: {
            //       id: "lisp",
            //     },
            //     id: "lines",
            //   },
            //   {
            //     match: {
            //       id: "elixir",
            //     },
            //     id: "lines",
            //   },
            //   {
            //     match: {
            //       id: "javascript",
            //     },
            //     id: "lines",
            //   },
          ]
        }
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
      <Button onClick={handleSendResult}> 보내기 </Button>
    </>
  );
};

const QuizChart: FC<{ data: QuizMetaData }> = ({ data }) => {
  return (
    <Box h="500px">
      <Text>차트</Text>
      <Text>{data.createdAt}</Text>
      <Suspense fallback={"loading"}>
        <MyResponsivePie id={data.createdAt} data={data.data} />
      </Suspense>
    </Box>
  );
};

export default QuizChart;
