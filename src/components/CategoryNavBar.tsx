import {
  Box,
  BoxProps,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  FlexProps,
  Icon,
  IconButton,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { ReactText, useContext } from "react";
import { IconType } from "react-icons";
import {
  FiActivity,
  FiArchive,
  FiCpu,
  FiDollarSign,
  FiGlobe,
  FiMenu,
  FiStar,
  FiTrendingUp,
} from "react-icons/fi";
import { NavigationContext } from "../context/CategoryContext";
import { useCategoryQuery } from "../generated/graphql";

interface LinkItemProps {
  icon: IconType;
}
const LinkIcons: Array<LinkItemProps> = [
  { icon: FiTrendingUp },
  { icon: FiCpu },
  { icon: FiGlobe },
  { icon: FiActivity },
  { icon: FiDollarSign },
  { icon: FiStar },
  { icon: FiArchive },
];

const CategoriesLinkItems = () => {
  const categories = useCategoryQuery();
  const categoriesLink = categories[0].data?.category;
  return categoriesLink;
};

export default function CategoryNavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const categoriesLink = CategoriesLinkItems();
  const { setCategory } = useContext(NavigationContext);
  const handleClick = (_id: number) => {
    setCategory(_id);
  };

  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: "60" }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      <NavItem icon={LinkIcons[0]?.icon} onClick={() => handleClick(0)}>
        Popular
      </NavItem>

      {categoriesLink?.map((link, index) => (
        <NavItem
          key={link._id}
          icon={LinkIcons[index + 1]?.icon}
          onClick={() => handleClick(link._id)}
        >
          {link.title}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Flex
      align="center"
      p="4"
      mx="4"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      _hover={{
        bg: "cyan.400",
        color: "white",
      }}
      {...rest}
    >
      {icon && (
        <Icon
          mr="4"
          fontSize="16"
          _groupHover={{
            color: "white",
          }}
          as={icon}
        />
      )}
      {children}
    </Flex>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("#F7FAFC", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />
    </Flex>
  );
};
