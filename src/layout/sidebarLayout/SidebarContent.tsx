import { Box, BoxProps, CloseButton, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { FiCompass, FiHome, FiSettings, FiStar, FiTrendingUp } from "react-icons/fi";
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
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map(link => (
        <SidebarNavItem key={link.name} icon={link.icon} url={link.url}>
          {link.name}
        </SidebarNavItem>
      ))}
    </Box>
  );
};
export default SidebarContent;
