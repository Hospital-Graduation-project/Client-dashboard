// Chakra Imports
import {
  Avatar,
  Button,
  Flex,
  Icon,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useColorMode,
  HStack,
} from '@chakra-ui/react';
// Custom Components
import { ItemContent } from 'components/admin/menu/ItemContent';
import { SidebarResponsive } from 'components/admin/sidebar/Sidebar';
import PropTypes from 'prop-types';
import React from 'react';
// Assets
import navImage from 'assets/img/layout/Navbar.png';
import { MdNotificationsNone, MdInfoOutline } from 'react-icons/md';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';
import { FaEthereum } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import arImg from "../../../assets/img/ar.jpg"
import enImg from "../../../assets/img/en.png"
import AdminRoutes from 'routes/AdminRoutes';
import { useDispatch } from 'react-redux';
import { Logout } from '../../../redux/slices/logedUserSlice';

export default function HeaderLinks(props) {
  const { secondary } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // Chakra Color Mode
  const navbarIcon = useColorModeValue('gray.400', 'white');
  let menuBg = useColorModeValue('white', 'navy.800');
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorBrand = useColorModeValue('brand.700', 'brand.400');
  const ethColor = useColorModeValue('gray.700', 'white');
  const borderColor = useColorModeValue('#E6ECFA', 'rgba(135, 140, 189, 0.3)');
  const ethBg = useColorModeValue('secondaryGray.300', 'navy.900');
  const ethBox = useColorModeValue('white', 'navy.800');
  const shadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
    '14px 17px 40px 4px rgba(112, 144, 176, 0.06)',
  );
  const borderButton = useColorModeValue('secondaryGray.500', 'whiteAlpha.200');
  const { i18n, t } = useTranslation()

  function toggleLang() {
    if (i18n.language == "en") {
      i18n.changeLanguage("ar")
      navigate("/rtl" + pathname)
    } else {
      i18n.changeLanguage("en")
      let ltrPath = pathname.includes("rtl") ? pathname.split("/rtl") : pathname
      ltrPath = ltrPath[ltrPath.length - 1]
      navigate(ltrPath)
    }
  }

  function handleLogout(){
    dispatch(Logout())
    navigate("/signin")
  }

  return (
    <Flex
      w={{ sm: '100%', md: 'auto' }}
      alignItems="center"
      flexDirection="row"
      bg={menuBg} 
      flexWrap={secondary ? { base: 'wrap', md: 'nowrap' } : 'unset'}
      p="10px"
      borderRadius="30px"
      boxShadow={shadow}
      justifyContent={"space-between"}
    >
      {/* <SearchBar
        mb={() => {
          if (secondary) {
            return { base: '10px', md: 'unset' };
          }
          return 'unset';
        }}
        me="10px"
        borderRadius="30px"
      /> */}
      {/* <Flex
        bg={ethBg}
        display={secondary ? 'flex' : 'none'}
        borderRadius="30px"
        ms="auto"
        p="6px"
        align="center"
        me="6px"
      >
        <Flex
          align="center"
          justify="center"
          bg={ethBox}
          h="29px"
          w="29px"
          borderRadius="30px"
          me="7px"
        >
          <Icon color={ethColor} w="9px" h="14px" as={FaEthereum} />
        </Flex>
        <Text
          w="max-content"
          color={ethColor}
          fontSize="sm"
          fontWeight="700"
          me="6px"
        >
          1,924
          <Text as="span" display={{ base: 'none', md: 'unset' }}>
            {' '}
            ETH
          </Text>
        </Text>
      </Flex> */}
      <SidebarResponsive AdminRoutes={AdminRoutes} />
      <HStack  spacing="4">
  <Menu>
    <MenuButton p="0px">
      <Icon
        mt="6px"
        as={MdNotificationsNone}
        color={navbarIcon}
        w="18px"
        h="18px"
        me="10px"
      />
    </MenuButton>
    <MenuList
      boxShadow={shadow}
      p="20px"
      borderRadius="20px"
      bg={menuBg}
      border="none"
      mt="22px"
      me={{ base: "30px", md: "unset" }}
      minW={{ base: "unset", md: "400px", xl: "450px" }}
      maxW={{ base: "360px", md: "unset" }}
    >
      <Flex w="100%" mb="20px">
        <Text fontSize="md" fontWeight="600" color={textColor}>
          Notifications
        </Text>
        <Text
          fontSize="sm"
          fontWeight="500"
          color={textColorBrand}
          ms="auto"
          cursor="pointer"
        >
          Mark all read
        </Text>
      </Flex>
      <Flex flexDirection="column">
        <MenuItem _hover={{ bg: "none" }} _focus={{ bg: "none" }} px="0" borderRadius="8px" mb="10px">
          <ItemContent info="Horizon UI Dashboard PRO" />
        </MenuItem>
        <MenuItem _hover={{ bg: "none" }} _focus={{ bg: "none" }} px="0" borderRadius="8px" mb="10px">
          <ItemContent info="Horizon Design System Free" />
        </MenuItem>
      </Flex>
    </MenuList>
  </Menu>

  <Button
    variant="no-hover"
    bg={ethBg}
    p="16px"
    minW="unset"
    mx="2"
    minH="unset"
    h="18px"
    w="max-content"
    onClick={toggleColorMode}
  >
    {colorMode === "light" ? "Dark" : "Light"}
    <Icon
      mx="8px"
      h="18px"
      w="18px"
      color={navbarIcon}
      as={colorMode === "light" ? IoMdMoon : IoMdSunny}
    />
  </Button>

  <Button
    variant="no-hover"
    bg={ethBg}
    p="16px"
    minW="unset"
    mx="2"
    minH="unset"
    h="18px"
    w="max-content"
    onClick={toggleLang}
  >
    {i18n.language === "en" ? "Ar" : "En"}
    <Image src={i18n.language === "en" ? arImg : enImg} w="24px" mx="8px" borderRadius="16px" />
  </Button>

  <Menu>
    <MenuButton p="0px">
      <Avatar
        _hover={{ cursor: "pointer" }}
        color="white"
        name="Adela Parkson"
        bg="#11047A"
        size="sm"
        w="40px"
        h="40px"
      />
    </MenuButton>
    <MenuList
      boxShadow={shadow}
      p="0px"
      mt="10px"
      borderRadius="20px"
      bg={menuBg}
      border="none"
    >
      <Flex w="100%" mb="0px">
        <Text
          ps="20px"
          pt="16px"
          pb="10px"
          w="100%"
          borderBottom="1px solid"
          borderColor={borderColor}
          fontSize="sm"
          fontWeight="700"
          color={textColor}
        >
          👋&nbsp; Hey, Adela
        </Text>
      </Flex>
      <Flex flexDirection="column" p="10px">
        <MenuItem _hover={{ bg: "none" }} _focus={{ bg: "none" }} borderRadius="8px" px="14px">
          <Text fontSize="sm">Profile Settings</Text>
        </MenuItem>
        <MenuItem _hover={{ bg: "none" }} _focus={{ bg: "none" }} borderRadius="8px" px="14px">
          <Text fontSize="sm">Newsletter Settings</Text>
        </MenuItem>
        <MenuItem  _hover={{ bg: "none" }} _focus={{ bg: "none" }} color="red.400" borderRadius="8px" px="14px" onClick={handleLogout}>
          <Text fontSize="sm">Log out</Text>
        </MenuItem>
      </Flex>
    </MenuList>
  </Menu>
</HStack>

    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
