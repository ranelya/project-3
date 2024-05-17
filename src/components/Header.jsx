import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React, { useEffect} from "react";
import { Link, NavLink } from "react-router-dom";
import { BsSun, BsMoonStarsFill } from "react-icons/bs";
import Register from "./Register";
import Login from "./Login";
import { useAuth } from "./hooks/Auth";
import { useDispatch } from "react-redux";


const Header = ({ user }) => {
  const { isAuth, email, token } = useAuth();
  useEffect(() => {
    console.log(user, "my user");
  }, [email, user]);

  const dispatch = useDispatch();
  console.log(email);
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box maxW={1536} as="header">
      <Box flex justifyContent="space-between">
        <Flex
          borderBottom="1px solid #f2f2f2"
          gap="7px"
          alignItems="center"
          py="20px"
          pl="50px"
          justifyContent="space-between"
          pr="50px"
        >
             <Flex gap="20px" display={{ base: "none", md: "flex" }}>
              <Link to="/">
                <Image w="70px" src="/assets/logo.png" alt="logo" />
              </Link>
              <Flex flexDir="column">
                <Text as="span" fontWeight="500" fontSize="17px">
                  Доставка пиццы Бишкек
                </Text>
                <Text as="span" fontWeight="300" fontSize="15px">
                  37 мин 4.77
                </Text>
              </Flex>
              <Flex flexDir="column">
                <Text as="span" fontWeight="400" fontSize="17px">
                  0 (551) 550-550
                </Text>
                <Text
                  as="span"
                  fontWeight="300"
                  fontSize="15px"
                  color="rgb(153, 153, 153)"
                >
                  Звонок по телефону
                </Text>
              </Flex>
            </Flex>
          <Flex gap="30px">
          <Link to='/' style={{fontWeight:600, fontSize:'16px'}}>Главная</Link>
            <Link  to="/aboutus" style={{fontWeight:600, fontSize:'16px'}}>О нас</Link>
            {token ? <Link to="/admin" style={{fontWeight:600, fontSize:'16px'}}>Админ Панель</Link> : null}
            <Box>
                    {token ? (
                      <NavLink to="/cabinet">
                        <Text as="span" fontWeight="600" fontSize="16px">
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
          </Flex>
          <Button
            aria-label="Toggle Color Mode"
            onClick={toggleColorMode}
            _focus={{ boxShadow: "none" }}
            w="fit-content"
          >
            {colorMode === "light" ? <BsMoonStarsFill /> : <BsSun />}
          </Button>
        </Flex>
      </Box>
      <Box pl="50px">
        <Box flex flexDirection="row" justifyContent="space-between">
          <Flex
            gap="20px"
            alignItems="center"
            fontSize="26px"
            fontWeight="600"
            justifyContent="space-between"
            margin="0 auto"
          >
            <Box
              flex
              flexDirection="row"
              gap="4px"
              justifyContent="space-between"
            >
              <Flex
                alignItems="center"
                flexDirection="row"
                gap="15px"
                justifyContent="space-between"
                pr="50px"
              >
                <Flex gap="20px">
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
