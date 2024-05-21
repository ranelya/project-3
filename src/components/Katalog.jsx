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
  Icon
} from "@chakra-ui/react";
import {
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
import { MdShoppingCart } from 'react-icons/md';

const Katalog = () => {
  const [size, setSize] = React.useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [favPizza, setFavPizza] = useState(null);

  const linkStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
    border: '1px solid orange',
    height: '35px',
    width: '100px',
    borderRadius: '50px',
    fontSize: '15px',
    fontWeight: '600',
    textDecoration: 'none',
    transition: 'background-color 0.3s, color 0.3s'
  };

  const hoverStyle = {
    backgroundColor: 'transparent',
    color: 'orange'
  };


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
        style={linkStyle}
        activeStyle={{ ...linkStyle, backgroundColor: 'orange' }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = hoverStyle.backgroundColor;
          e.target.style.color = hoverStyle.color;
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'orange';
          e.target.style.color = 'black';
        }}>Дессерты
        </NavLink>

          <NavLink to="/beverages"
        style={{ ...linkStyle, backgroundColor: 'transperent', color: 'orange' }}
        activeStyle={{ ...linkStyle, backgroundColor: 'orange', color: 'white' }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = hoverStyle.backgroundColor;
          e.target.style.color = hoverStyle.color;
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'orange';
          e.target.style.color = 'black';
        }}>
          Напитки
        </NavLink>
        </Flex>
        {sizes.map((size) => (
        <Button
          onClick={() => handleClick(size)}
          key={size}
          bg="orange"
          m={4}
          _hover={{ transform: 'scale(1.1)', transition: 'transform 0.2s' }} // эффект при наведении
        >
          <Icon 
            as={MdShoppingCart} 
            boxSize={6} 
          />
        </Button>
      ))}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>

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
                    <Button colorScheme='teal' variant='ghost' onClick={() => handleDelete(pizza.id)}>
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
