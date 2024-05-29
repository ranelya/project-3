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
  VStack,
} from "@chakra-ui/react";
import { BsMoonStarsFill, BsSun } from "react-icons/bs";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useAuth } from "./hooks/Auth";
import Login from "./Login";
import Register from "./Register";
import "./Header.css";

const Header = ({ user }) => {
  const { email, token } = useAuth();
  const { toggleColorMode } = useColorMode();
  const buttonColor = useColorModeValue("white", "gray.800");
  const buttonIcon = useColorModeValue(<BsMoonStarsFill />, <BsSun />);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    console.log(user, "my user");
  }, [email, user]);

  return (
    <>
      <Box
        as="header"
        position="fixed"
        top={0}
        width="100%"
        zIndex={1000}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow="sm"
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          py={{ base: "10px", md: "20px" }}
          px={{ base: "20px", md: "50px" }}
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

          <Flex display={{ base: "none", md: "flex" }} gap="20px" alignItems="center">
            <RouterLink to="/" fontWeight={600} fontSize="16px" className="HeaderLink">
              Главная
            </RouterLink>
            <RouterLink to="/aboutus" fontWeight={600} fontSize="16px" className="HeaderLink">
              О нас
            </RouterLink>
            {token && user?.isAdmin && (
              <RouterLink to="/admin" fontWeight={600} fontSize="16px" className="HeaderLink">
                Админ Панель
              </RouterLink>
            )}
            {token ? (
              <RouterLink to="/cabinet" className="HeaderLink">
                <Text fontWeight="400" fontSize="16px">
                  Кабинет
                </Text>
              </RouterLink>
            ) : (
              <>
                <Login />
                <Register />
              </>
            )}
          </Flex>

          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
            mr="10px" // Добавлено для отступа между бургер-меню и переключателем
          />
          <Button
            aria-label="Toggle Color Mode"
            onClick={toggleColorMode}
            _focus={{ boxShadow: "none" }}
            bg={buttonColor}
            ml="10px" // Добавлено для отступа между бургер-меню и переключателем
          >
            {buttonIcon}
          </Button>
        </Flex>

        {isOpen && (
          <Box pb={4} display={{ lg: "none" }}>
            <VStack as="nav" spacing={4} alignItems="flex-start">
              <RouterLink to="/" fontWeight={600} fontSize="16px" className="HeaderLink">
                Главная
              </RouterLink>
              <RouterLink to="/aboutus" fontWeight={600} fontSize="16px" className="HeaderLink">
                О нас
              </RouterLink>
              {token && user?.isAdmin && (
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
