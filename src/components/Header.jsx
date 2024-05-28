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
          justifyContent="space-between"
          borderBottom="1px solid #f2f2f2"
          py="20px"
          px="50px"
        >
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
      </Box>
      <Box height="100px" /> {/* Adding space to prevent overlap */}
    </>
  );
};

export default Header;
