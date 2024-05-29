import React, { useEffect } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Link as ChakraLink,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { BsSun, BsMoonStarsFill } from "react-icons/bs";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useAuth } from "./hooks/Auth";
import { useDispatch } from "react-redux";
import Login from "./Login";
import Register from "./Register";
import './Header.css';

const Header = ({ user }) => {
  const { email, token } = useAuth();
  const dispatch = useDispatch();
  const { toggleColorMode } = useColorMode();
  const buttonColor = useColorModeValue("white", "gray.800");
  const buttonIcon = useColorModeValue(<BsMoonStarsFill />, <BsSun />);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    console.log(user, "my user");
  }, [email, user]);

  const isMobile = useBreakpointValue({ base: true, md: false });
  const isMediumScreen = useBreakpointValue({ base: true, lg: false });

  return (
    <>
      <Box
        maxW={1536}
        as="header"
        position="fixed"
        top={0}
        width="100%"
        zIndex={1000}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow="sm"
        opacity={1}
      >
        <Flex
          alignItems="center"
          py={{ base: "10px", md: "20px" }}
          px={{ base: "20px", md: "50px" }}
          justifyContent="space-between"
          borderBottom="1px solid #f2f2f2"
        >
          <Flex alignItems="center" gap="20px">
            <RouterLink to="/">
              <Image w={{ base: "50px", md: "70px" }} src="/assets/logo-pizz.png" alt="logo" />
            </RouterLink>
            <Flex flexDirection="column" display={{ base: "none", md: "flex" }}>
              <Text fontWeight="500" fontSize="17px">
                Доставка пиццы Бишкек
              </Text>
              <Text fontWeight="300" fontSize="15px">
                37 мин 4.77
              </Text>
            </Flex>
            <Flex flexDirection="column" display={{ base: "none", md: "flex" }}>
              <ChakraLink as={RouterLink} to="/" fontWeight="400" fontSize="17px">
                0 (551) 550-550
              </ChakraLink>
              <Text fontWeight="300" fontSize="15px" color="rgb(153, 153, 153)">
                Звонок по телефону
              </Text>
            </Flex>
          </Flex>

          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <Flex gap="15px" display={{ base: isOpen ? "flex" : "none", md: "flex" }} alignItems="center">
            <RouterLink to="/aboutus" className="HeaderLink">
              О нас
            </RouterLink>
            {user?.isAdmin && (
              <RouterLink to="/admin" className="HeaderLink">
                Админ Панель
              </RouterLink>
            )}
            <Box>
              {token ? (
                <RouterLink className="HeaderLink" to="/cabinet">
                  <Text fontWeight="400" fontSize="16px">
                    Кабинет
                  </Text>
                </RouterLink>
              ) : (
                <Flex gap="20px">
                  <Login />
                  <Register />
                </Flex>
              )}
            </Box>
            <Button
              aria-label="Toggle Color Mode"
              onClick={toggleColorMode}
              _focus={{ boxShadow: "none" }}
              bg={buttonColor}
            >
              {buttonIcon}
            </Button>
          </Flex>
        </Flex>

        {isOpen && (
          <Box pb={4} display={{ lg: "none" }}>
            <VStack as={"nav"} spacing={4}>
              <RouterLink to="/" fontWeight={600} fontSize="16px" className="HeaderLink">
                Главная
              </RouterLink>
              <RouterLink to="/aboutus" fontWeight={600} fontSize="16px" className="HeaderLink">
                О нас
              </RouterLink>
              {token && (
                <RouterLink to="/admin" fontWeight={600} fontSize="16px" className="HeaderLink">
                  Админ Панель
                </RouterLink>
              )}
              <Box>
                {token ? (
                  <RouterLink to="/cabinet" className="HeaderLink">
                    <Text fontWeight="400" fontSize="16px">
                      Кабинет
                    </Text>
                  </RouterLink>
                ) : (
                  <Flex gap="20px">
                    <Login />
                    <Register />
                  </Flex>
                )}
              </Box>
            </VStack>
          </Box>
        )}
      </Box>
      <Box height="100px" />
    </>
  );
};

export default Header;
