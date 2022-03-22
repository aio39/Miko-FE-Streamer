import { BoxProps, Flex, HStack, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { selectedConcertIdState } from "@src/state/recoil/myPageRecoil/myPageState";
import { useMemo } from "react";
import { IconType } from "react-icons";
import { FiCompass, FiHome, FiSettings, FiStar, FiTrendingUp } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import SidebarNavItem from "./SidebarNavItem";
interface LinkItemProps {
  name: string;
  icon: IconType;
  url: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, url: "/my/" },
  { name: "콘서트 생성", icon: FiTrendingUp, url: "/my/create" },
  { name: "회원 정보 수정", icon: FiCompass, url: "/my/edit" },
  { name: "콘서트 리스트", icon: FiStar, url: "/my/concerts" },
  { name: "Settings", icon: FiSettings, url: "/my/" },
];

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const selectedConcertId = useRecoilValue(selectedConcertIdState);
  let location = useLocation();

  const isConcertDetailPage = useMemo(() => {
    const regex = /(\/my\/concerts\/)+[\d]/g;
    return location.pathname.match(regex)?.length === 1 ? true : false;
  }, [location.pathname, location]);

  console.log("콘서트 디테일 페이지", isConcertDetailPage);

  return (
    <HStack h="100vh">
      <VStack w="150px" m="0" bg={useColorModeValue("white", "gray.900")} h="full" borderRightColor={useColorModeValue("gray.200", "gray.700")}>
        <Flex alignItems="center">
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            Logo
          </Text>
        </Flex>
        {LinkItems.map(link => (
          <SidebarNavItem key={link.name} icon={link.icon} url={link.url}>
            {link.name}
          </SidebarNavItem>
        ))}
      </VStack>
      {isConcertDetailPage ? (
        <VStack transition="3s ease" w="100px" h="full" bgColor="blackAlpha.400" m="0">
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            Logo
          </Text>
        </VStack>
      ) : (
        ""
      )}
    </HStack>
  );
};
export default SidebarContent;
