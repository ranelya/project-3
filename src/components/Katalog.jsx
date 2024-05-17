import {
  Image,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  useDisclosure,
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
import { db } from "./FireBase-config";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Katalog = () => {
  const [size, setSize] = React.useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [favPizza, setFavPizza] = useState(null);


  const handleClick = (newSize) => {
    setSize(newSize);
    onOpen();
  };
  const user_prof = useSelector((state) => state.user);

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
  const sizes = ["sm"];

  return (
    <Box>
      <Flex pl="50px" pr="50px" justifyContent="space-between" textAlign="center"  >
        <Flex gap="30px" padding="25px" >
          <NavLink  to="/combo"
           style={{backgroundColor:'orange' , 
          border:'1px solid orange',
           height:'35px', 
           width:'100px', 
           borderRadius:'50px',
           fontSize:'15px', 
           fontWeight:'600'}}>Дессерты</NavLink>
          <NavLink to="/beverages"
          style={{border:'1px solid orange',
          height:'35px', 
          width:'100px', 
          borderRadius:'50px',
          fontSize:'15px', 
          fontWeight:'600'}}>Напитки</NavLink>
        </Flex>
        {sizes.map((size) => (
          <Button
            onClick={() => handleClick(size)}
            key={size}
            bg="orange"
            borderRadius="20px"
            m={4}
          >
            {" "}
            Корзина
          </Button>
        ))}

        <Drawer onClose={onClose} isOpen={isOpen} size={size}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />

            {favPizza && favPizza.length > 0 ? (
              <Box overflow="scroll">
                {favPizza.map((pizza) => (
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
                    <Button onClick={() => handleDelete(pizza.id)}>
                      Delete
                    </Button>
                  </Box>
                ))}
                {user_prof.email ? (
                  <Text>Total Price: {calculateTotalPrice2()} сом</Text>
                ) : (
                  <Text>Total Price: {calculateTotalPrice()} сом</Text>
                )}
                <NavLink to="/buy">
                  <Button
                    onClick={() => {
                      onClose();
                    }}
                  >
                    Купить
                  </Button>
                </NavLink>
              </Box>
            ) : (
              <DrawerBody>
                <Image
                  pt="190px"
                  m="auto"
                  src="https://dodopizza-a.akamaihd.net/site-static/dist/121df529925b0f43cc73.svg"
                  alt="Dog"
                />
                <Box pt="20px" textAlign="center">
                  <Text fontSize="22px">Ой, пусто!</Text>
                  <Text>
                    Ваша корзина пуста, откройте «Меню» и выберите понравившийся
                    товар. Мы доставим ваш заказ от 365 сом
                  </Text>
                </Box>
              </DrawerBody>
            )}
          </DrawerContent>
        </Drawer>
      </Flex>
    </Box>
  );
};

export default Katalog;
