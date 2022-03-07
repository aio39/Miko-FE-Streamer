import { Center, VStack } from '@chakra-ui/react';
import { Information, Message, Quiz, Ranking, WindowType } from 'const';
import { FC } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedWindowState } from 'state/recoil/selectedWindowState';
import { ReactComponent as InformationLogo } from 'svg/information.svg';
import { ReactComponent as MessageLogo } from 'svg/message.svg';
import { ReactComponent as QuizLogo } from 'svg/quiz.svg';
import { ReactComponent as RankingLogo } from 'svg/ranking.svg';

const IconWrapper: FC<{ type: WindowType }> = ({ type, children }) => {
  const [selectedWindow, setSelectedWindow] =
    useRecoilState(selectedWindowState);

  const handleChangeWindow = () => {
    setSelectedWindow(type);
  };

  return (
    <Center w="full" h="full" onClick={handleChangeWindow}>
      {children}
    </Center>
  );
};

const SideBar = () => {
  const selectedWindow = useRecoilValue(selectedWindowState);

  return (
    <VStack pt="2" px="2">
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
      <IconWrapper type={Ranking}>
        <RankingLogo />
      </IconWrapper>
    </VStack>
  );
};

export default SideBar;
