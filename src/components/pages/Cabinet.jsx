import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Grid, Heading, Image, SimpleGrid, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../../store/Slices/userSlice'; // Updated import
import { Link } from 'react-router-dom';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../FireBase-config';

const Cabinet = () => {
  const userProf = useSelector((state) => state.user); // Redux state
  const dispatch = useDispatch();

  const [favPizza, setFavPizza] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'ShopCollection'));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let pizzaArr = [];
      querySnapshot.forEach((doc) => {
        pizzaArr.push({ ...doc.data(), id: doc.id });
      });
      setFavPizza(pizzaArr);
    });
    return () => unsub();
  }, []);

  const handleLogout = () => {
    dispatch(removeUser()); // Clear user state on logout
  };

  return (
    <Box>
      {userProf.token ? (
        <Box pb="50px" pl="50px">
          <Link to={`/`}>
            <Button m="auto" onClick={handleLogout}>
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
                  <Flex alignItems="center" justifyContent="space-between" pt="20px" pl="35px" fontSize="20px">
                    {userProf.email ? (
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
