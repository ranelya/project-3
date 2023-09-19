import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../hooks/Auth";
import { removeUser } from "../../store/Slices/userSlice";
import Header from "../Header";
import axios from "axios";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../FireBase-config";

const Cabinet = () => {
  const user_prof = useSelector((state) => state.user);
  const [favPizza, setFavPizza] = useState([]);

  const dispatch = useDispatch();
  const postData = () => {
    // try {
    //    axios({
    //     method: "POST",
    //     url: "https://pizza-and-desserts.p.rapidapi.com/pizzas/1",
    //     data: {
    //       "X-RapidAPI-Key":
    //         "e8da783e25msh8388c8b995fc613p12ae7ajsn799538dfcf2a",
    //       "X-RapidAPI-Host": "pizza-and-desserts.p.rapidapi.com",
    //     },
    //   });
    // } catch (error) {
    //   console.error(error);
    // }
  };
  // const user_prof = useSelector((state) => state.user);

  useEffect(() => {
    const q = query(collection(db, "ShopColletion"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let pizzaArr = [];

      querySnapshot.forEach((doc) => {
        pizzaArr.push({ ...doc.data(), id: doc.id });
      });

      setFavPizza(pizzaArr);
    });
    return () => unsub();
  }, []);
  const sizes = ["xl"];
  console.log(favPizza);
  let cookie = new Cookies();
  const [user, setUser] = useState(cookie.get("auth-token"));
  const { isAuth, email } = useAuth();
  return (
    <Box>
      {user_prof.email ? (
        <Box pb="50px" pl="50px">
          <Link to={`/`}>
            <Button m="auto" onClick={() => dispatch(removeUser())}>
              выйти
            </Button>
          </Link>
        </Box>
      ) : null}
      <Heading pl="24px" fontSize="24px">
        Недавно купленные
      </Heading>
      <SimpleGrid pt="20px" columns={[1, 2, 3, 4, 4]}>
        {favPizza.map((pizza) => (
          <Box p="12px" key={pizza.id}>
            <Grid templateColumns="repeat(4, 1fr)">
              <Flex flexDirection="column" gap="10px">
                <Box width="380px" alignItems="center" w="300px">
                  <Image dropShadow="xl" w="200px" src={pizza.image} />
                  <Text pl="35px" fontSize="20px">
                    {pizza.title}
                  </Text>
                  <Text pl="35px">{pizza.desc}</Text>
                  <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    pt="20px"
                    pl="35px"
                    fontSize="20px"
                  >
                    {user_prof.email ? (
                      <Text fontSize="20px" fontWeight="300">
                        от {pizza.priceUser} сом
                      </Text>
                    ) : (
                      <Text fontSize="20px" fontWeight="300">
                        от {pizza.price} сом
                      </Text>
                    )}
                    {/* {sizes.map((size) => (
                      <Button
                        bg="orange"
                        // onClick={() => handleSizeClick(size, pizza)}
                        key={size}
                        m={4}
                      >
                        Выбрать
                      </Button>
                    ))} */}
                  </Flex>
                </Box>
              </Flex>
            </Grid>
            <Flex gap="10px"></Flex>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Cabinet;
