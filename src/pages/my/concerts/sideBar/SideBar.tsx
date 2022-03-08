import { Center, VStack } from '@chakra-ui/react';
import { Information, Message, Quiz, Ranking, WindowType } from '@src/const';
import { selectedWindowState } from '@src/state/recoil/selectedWindowState';
import { ReactComponent as InformationLogo } from '@src/svg/information.svg';
import { ReactComponent as MessageLogo } from '@src/svg/message.svg';
import { ReactComponent as QuizLogo } from '@src/svg/quiz.svg';
import { ReactComponent as RankingLogo } from '@src/svg/ranking.svg';
import { FC } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

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
