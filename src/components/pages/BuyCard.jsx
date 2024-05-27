import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { db } from "../FireBase-config";
import { useSelector } from "react-redux";

const BuyCard = () => {
  const [favPizza, setFavPizza] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "ogogoPzFav"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let pizzaArr = [];

      querySnapshot.forEach((doc) => {
        pizzaArr.push({ ...doc.data(), id: doc.id });
      });

      setFavPizza(pizzaArr);
    });

    return () => unsub();
  }, []);
  const user_prof = useSelector((state) => state.user);
  const calculateTotalPrice = () => {
    if (!favPizza) return 0;

    const totalPrice = favPizza.reduce((accumulator, pizza) => {
      return accumulator + parseInt(pizza.price, 10);
    }, 0);

    return totalPrice;
  };
  const calculateTotalPrice2 = () => {
    if (!favPizza) return 0;

    const totalPrice = favPizza.reduce((accumulator, pizza) => {
      return accumulator + parseInt(pizza.priceUser, 10);
    }, 0);

    return totalPrice;
  };
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "ogogoPzFav", id));
  };
  const toast = useToast();
  const handleAddCart = async (arr) => {
    await arr.forEach((item) => {
      addDoc(collection(db, "ShopColletion"), item);
    });
      await arr.forEach((item) => {
        deleteDoc(doc(db, "ogogoPzFav", item.id));
      });
  };
  return (
    <Box alignItems="center" maxWidth="400px" mx="auto">
      <Flex alignItems="center" justifyContent="space-between">
        <Heading fontWeight="600" fontSize="23px">
          Оплата картой
        </Heading>
        <Image w="60px" src="/assets/visa.png" />
      </Flex>

      <Flex flexDirection="column" gap="10px">
        <Box pt="20px">
          <Input type="text" placeholder="номер вашей карты" />
        </Box>
        <Box>
          <Input type="text" placeholder="Имя валдельца" />
        </Box>
        <Box>
          <Input
            type="text"
            placeholder="сумма оплаты"
            value={
              user_prof.email ? calculateTotalPrice2() : calculateTotalPrice()
            }
            readOnly
          />

          <Button
          marginTop="20px" marginLeft="150px" type="submit" onClick={() => handleAddCart(favPizza)}>
            <NavLink to={`/`}>
              Оплатить
            </NavLink>
          </Button>
        </Box>
        {favPizza.map((pizza) => (
          <>
            <Box key={pizza.id}>
              <Flex pb="10px" gap="10px" w="430px" alignItems="center">
                <Image w="100px" src={pizza.image} alt={pizza.title} />
                <Box>
                  <Text fontSize="20px">{pizza.title}</Text>
                  <Text fontSize="12px">{pizza.desc}</Text>
                  {user_prof.email ? (
                    <Text fontSize="20px">{pizza.priceUser} сом</Text>
                  ) : (
                    <Text fontSize="20px">{pizza.price} сом</Text>
                  )}
                </Box>
              </Flex>
              <Button
                onClick={() => {
                  handleDelete(pizza.id);
                  toast({
                    title: "",
                    description: "вы успешно добавили в корзину",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                  });
                }}
              >
                Удалить
              </Button>
            </Box>
          </>
        ))}
      </Flex>
    </Box>
  );
};

export default BuyCard;
