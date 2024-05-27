import React, { useEffect } from "react";
import "./Header.css";
import {
  Box,
  Flex,
  Image,
  Text,
  Button,
  IconButton,
  VStack,
  HStack,
  useDisclosure,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link as RouterLink, NavLink } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { BsSun, BsMoonStarsFill } from "react-icons/bs";
import { FaSignInAlt, FaUser } from "react-icons/fa";
import Login from "./Login";
import Register from "./Register";
import { useAuth } from "./hooks/Auth";

const Header = () => {
  const { email, token } = useAuth();
  useEffect(() => {
    console.log(email, "my email");
  }, [email]);

  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const isMediumScreen = useBreakpointValue({ base: true, lg: false });

  return (
    <>
      <Box
        maxW={2000}
        as="header"
        position="fixed"
        top={0}
        width="100%"
        zIndex={1000}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow="sm"
        backdropFilter="blur(10px)"
      >
        <Flex
          borderBottom="1px solid #f2f2f2"
          alignItems="center"
          py={{ base: "10px", md: "20px" }}
          px={{ base: "20px", md: "50px" }}
          justifyContent="space-between"
        >
          <RouterLink to="/">
            <Image w={{ base: "50px", md: "70px" }} src="/assets/logo-pizz.png" alt="logo" />
          </RouterLink>
          <Flex
            gap="20px"
            alignItems="center"
            display={{ base: "none", lg: "flex" }}
          >
            <Flex flexDir="column">
              <Text as="span" fontWeight="500" fontSize={{ base: "14px", lg: "17px" }}>
                Доставка пиццы Каракол
              </Text>
              <Text as="span" fontWeight="300" fontSize={{ base: "12px", lg: "15px" }}>
                37 мин 4.77
              </Text>
            </Flex>
            <Flex flexDir="column">
              <ChakraLink href="tel:+996502005999">
                <Text as="span" fontWeight="400" fontSize={{ base: "14px", lg: "17px" }}>
                  0 (551) 550-550
                </Text>
              </ChakraLink>
              <Text
                as="span"
                fontWeight="300"
                fontSize={{ base: "12px", lg: "15px" }}
                color="rgb(153, 153, 153)"
              >
                Звонок по телефону
              </Text>
            </Flex>
          </Flex>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ lg: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"} display={{ base: "none", lg: "flex" }}>
            <RouterLink to="/" as={ChakraLink} fontWeight={600} fontSize="16px" className="HeaderLink">
              Главная
            </RouterLink>
            <RouterLink to="/aboutus" as={ChakraLink} fontWeight={600} fontSize="16px" className="HeaderLink">
              О нас
            </RouterLink>
            {token && (
              <RouterLink to="/admin" as={ChakraLink} fontWeight={600} fontSize="16px" className="HeaderLink">
                Админ Панель
              </RouterLink>
            )}
            <Box>
              {token ? (
                <NavLink to="/cabinet" as={ChakraLink} fontWeight={600} fontSize="16px" className="HeaderLink">
                  Кабинет
                </NavLink>
              ) : (
                <HStack spacing={4}>
                  <Login />
                  <Register />
                </HStack>
              )}
            </Box>
          </HStack>
          <Button
            aria-label="Toggle Color Mode"
            onClick={toggleColorMode}
            _focus={{ boxShadow: "none" }}
            w="fit-content"
          >
            {colorMode === "light" ? <BsMoonStarsFill /> : <BsSun />}
          </Button>
        </Flex>

        {isOpen && (
          <Box pb={4} display={{ lg: "none" }}>
            <VStack as={"nav"} spacing={4}>
              <RouterLink to="/"  fontWeight={600} fontSize="16px" className="HeaderLink">
                Главная
              </RouterLink>
              <RouterLink to="/aboutus" fontWeight={600} fontSize="16px" className="HeaderLink">
                О нас
              </RouterLink>
              {token && (
                <RouterLink to="/admin"fontWeight={600} fontSize="16px" className="HeaderLink">
                  Админ Панель
                </RouterLink>
              )}
              <Box>
                {token ? (
                  <RouterLink to="/cabinet" fontWeight={600} fontSize="16px" className="HeaderLink">
                    Кабинет
                  </RouterLink>
                ) : (
                  <HStack spacing={4}>
                    {isMobile ? (
                      <>
                        <IconButton
                          icon={<FaSignInAlt />}
                          aria-label="Login"
                          onClick={() => console.log("Login clicked")}
                        />
                        <IconButton
                          icon={<FaUser />}
                          aria-label="Register"
                          onClick={() => console.log("Register clicked")}
                        />
                      </>
                    ) : (
                      <>
                        <Login />
                        <Register />
                      </>
                    )}
                  </HStack>
                )}
              </Box>
              <Flex flexDir="column" alignItems="center">
                <Text as="span" fontWeight="500" fontSize={{ base: "14px", lg: "17px" }}>
                  Доставка пиццы Каракол
                </Text>
                <ChakraLink href="tel:+996502005999">
                  <Text as="span" fontWeight="400" fontSize={{ base: "14px", lg: "17px" }}>
                    0 (551) 550-550
                  </Text>
                </ChakraLink>
              </Flex>
            </VStack>
          </Box>
        )}
      </Box>
      <Box h="80px" /> 
    </>
  );
};

export default Header;
