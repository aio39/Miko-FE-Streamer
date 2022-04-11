import { Center, VStack } from "@chakra-ui/react";
import { Chart, Information, Message, Quiz, Ranking, Recording, Sell, WindowType } from "@src/const";
import { selectedWindowState } from "@src/state/recoil/selectedWindowState";
import { ReactComponent as ChartLogo } from "@src/svg/chart.svg";
import { ReactComponent as InformationLogo } from "@src/svg/information.svg";
import { ReactComponent as MessageLogo } from "@src/svg/message.svg";
import { ReactComponent as QuizLogo } from "@src/svg/quiz.svg";
import { ReactComponent as RankingLogo } from "@src/svg/ranking.svg";
import { ReactComponent as SellLogo } from "@src/svg/sell.svg";
import { FC } from "react";
import { useRecoilState } from "recoil";

const IconWrapper: FC<{ type: WindowType }> = ({ type, children }) => {
  const [selectedWindow, setSelectedWindow] = useRecoilState(selectedWindowState);

  const handleChangeWindow = () => {
    setSelectedWindow(type);
  };

  return (
    <Center w="full" h="full" onClick={handleChangeWindow} bgColor={type === selectedWindow ? "blue.100" : "#FFFFFF00"} p="2">
      {children}
    </Center>
  );
};

const SideBar = () => {
  return (
    <VStack pt="2">
      <IconWrapper type={Quiz}>
        <QuizLogo />
      </IconWrapper>
      <IconWrapper type={Message}>
        <MessageLogo />
      </IconWrapper>
      <IconWrapper type={Information}>
        <InformationLogo />
      </IconWrapper>
      <IconWrapper type={Ranking}>
        <RankingLogo />
      </IconWrapper>
      <IconWrapper type={Sell}>
        <SellLogo />
      </IconWrapper>
      <IconWrapper type={Chart}>
        <ChartLogo />
      </IconWrapper>
      <IconWrapper type={Recording}>
        <ChartLogo />
      </IconWrapper>
    </VStack>
  );
};

export default SideBar;
