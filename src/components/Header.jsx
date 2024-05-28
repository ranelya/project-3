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
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { BsSun, BsMoonStarsFill } from "react-icons/bs";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useAuth } from "./hooks/Auth";
import { useDispatch } from "react-redux";
import Login from "./Login";
import Register from "./Register";
import './Header.css'

<<<<<<< HEAD

const Header = ({ user }) => {
=======
const Header = () => {
>>>>>>> 3b34d188133b2011da428a44167cf1bff33622dd
  const { email, token } = useAuth();
  const dispatch = useDispatch();
  const { toggleColorMode } = useColorMode();
  const buttonColor = useColorModeValue("white", "gray.800");
  const buttonIcon = useColorModeValue(<BsMoonStarsFill />, <BsSun />);
  const { isOpen, onOpen, onClose } = useDisclosure();
<<<<<<< HEAD

  useEffect(() => {
    console.log(user, "my user");
  }, [email, user]);
=======
  const isMobile = useBreakpointValue({ base: true, md: false });
  const isMediumScreen = useBreakpointValue({ base: true, lg: false });
>>>>>>> 3b34d188133b2011da428a44167cf1bff33622dd

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
        opacity={1} // Ensuring the header is not transparent
      >
        <Flex
          alignItems="center"
<<<<<<< HEAD
=======
          py={{ base: "10px", md: "20px" }}
          px={{ base: "20px", md: "50px" }}
>>>>>>> 3b34d188133b2011da428a44167cf1bff33622dd
          justifyContent="space-between"
          borderBottom="1px solid #f2f2f2"
          py="20px"
          px="50px"
        >
<<<<<<< HEAD
          <Flex alignItems="center" gap="20px">
            <Link to="/">
              <Image w="70px" src="/assets/logo-pizz.png" alt="logo" />
            </Link>
            <Flex flexDirection="column" display={{ base: "none", md: "flex" }}>
              <Text fontWeight="500" fontSize="17px">
                Доставка пиццы Бишкек
              </Text>
              <Text fontWeight="300" fontSize="15px">
                37 мин 4.77
              </Text>
            </Flex>
            <Flex flexDirection="column" display={{ base: "none", md: "flex" }}>
              <ChakraLink as={Link} to="/" fontWeight="400" fontSize="17px">
                0 (551) 550-550
              </ChakraLink>
              <Text fontWeight="300" fontSize="15px" color="rgb(153, 153, 153)">
=======
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
>>>>>>> 3b34d188133b2011da428a44167cf1bff33622dd
                Звонок по телефону
              </Text>
            </Flex>
          </Flex>

          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
<<<<<<< HEAD
            aria-label="Open Menu"
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />

          <Flex
            gap="15px"
            display={{ base: isOpen ? "flex" : "none", md: "flex" }}
            alignItems="center"
          >
             <Link to="/aboutus" className="HeaderLink">О нас</Link>
             {user.isAdmin && <Link to="/admin">Админ Панель</Link>}
          <Box>
            {token ? (
              <NavLink className="HeaderLink" to="/cabinet">
                <Text fontWeight="400" fontSize="16px">
=======
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
>>>>>>> 3b34d188133b2011da428a44167cf1bff33622dd
                  Кабинет
                </Text>
              </NavLink>
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
<<<<<<< HEAD
=======

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
>>>>>>> 3b34d188133b2011da428a44167cf1bff33622dd
      </Box>
      <Box height="100px" /> {/* Adding space to prevent overlap */}
    </>
  );
};

export default Header;
