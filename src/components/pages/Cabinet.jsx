import { Box, Button, Flex, Grid, Heading, Image, SimpleGrid, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../hooks/Auth';
import { removeUser } from '../../store/Slices/userSlice';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import { collection, deleteDoc, doc, onSnapshot, query } from 'firebase/firestore';
import { db } from '../FireBase-config';

const Cabinet = () => {
  const user_prof = useSelector((state) => state.user);
  const [favPizza, setFavPizza] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const q = query(collection(db, 'ShopColletion'));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let pizzaArr = [];

      querySnapshot.forEach((doc) => {
        pizzaArr.push({ ...doc.data(), id: doc.id });
      });

      setFavPizza(pizzaArr);
    });
    return () => unsub();
  }, []);
  const sizes = ['xl'];
  console.log(favPizza);
  let cookie = new Cookies();
  const { token } = useAuth();
  return (
    <Box>
      {user_prof.token ? (
        <Box pb="50px" pl="50px">
          <Link to={`/`}>
            <Button m="auto" onClick={() => dispatch(removeUser())}>
              Выйти
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
                    fontSize="20px">
                    {user_prof.email ? (
                      <Text fontSize="20px" fontWeight="300">
                        от {pizza.priceUser} сом
                      </Text>
                    ) : (
                      <Text fontSize="20px" fontWeight="300">
                        от {pizza.price} сом
                      </Text>
                    )}
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
