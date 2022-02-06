import { Center, VStack } from "@chakra-ui/react";
import { FC } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Message, Quiz, WindowType } from "../../../const";
import { selectedWindowState } from "../../../recoil/selectedWindowState";
import { ReactComponent as MessageLogo } from './../../../svg/message.svg';
import { ReactComponent as QuizLogo } from './../../../svg/quiz.svg';



const IconWrapper: FC<{type: WindowType}> = ({type,children}) => {
    const [selectedWindow, setSelectedWindow] = useRecoilState(selectedWindowState);

    const handleChangeWindow = () => {
        setSelectedWindow(type)
    }

    return <Center w="full"  h="full"  onClick={handleChangeWindow} >
        {children}
    </Center>
}


const SideBar = () => {

    const  selectedWindow = useRecoilValue(selectedWindowState)

    return <VStack pt="2" px="2"  > 
       <IconWrapper type={Quiz}>
            <QuizLogo   />
       </IconWrapper>
       <IconWrapper type={Message} >
            <MessageLogo />
       </IconWrapper>
    </VStack>   
}

export default SideBar