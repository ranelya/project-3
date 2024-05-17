import {
  Image,
  Box,
  Button,
  Text,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Grid,
  useToast,
} from "@chakra-ui/react";
import {
  addDoc,
  collection,
} from "firebase/firestore";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { db } from "./FireBase-config";

const Card = ({ pizza}) => {
  let arr = [
    {
      title: "Маленькая",
      size: 150,
    },
    {
      title: "Средний",
      size: 200,
    },
    {
      title: "Большой",
      size: 250,
    },
  ];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = useState("md");
  const [sizePizza, setSizePizza] = useState(arr[0].size);

  const [ setCurrentPizza] = useState(null);

  const user_prof = useSelector((state) => state.user);

  const handleSizeClick = (newSize) => {
    setSize(newSize);
    onOpen();
  };

  const handleAddCart = async (e) => {
    await addDoc(collection(db, "ogogoPzFav"), pizza);
  };
  const sizes = ["xl"];

  const handleSizePizza = (sizePizza) => {
    setSizePizza(sizePizza);
  };
  const toast = useToast();
  return (
    <Box p="12px" >
      <Grid templateColumns="repeat(4, 1fr)">
        <Flex flexDirection="column" gap="10px">
          <Box width="380px" alignItems="center" w="300px" border="1px solid #e2e2e2">
            <Image dropShadow="xl" maxW="200px" height="200px" src={pizza.image} margin="0 auto"/>
            <Text pl="35px" fontSize="18px" fontWeight="600">
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

              {sizes.map((size) => (
                <Button
                 display="block"
                 maxW="750px"
                  bg="orange"
                  onClick={() => handleSizeClick(size)}
                  key={size}
                  m={4}
                >
                  Выбрать
                </Button>
              ))}
              <Modal onClose={onClose} size={size} isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>{pizza.title}</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Flex gap="10px">
                      {arr.map((item, index) => (
                        <Button
                          bg="orange"
                          key={index}
                          onClick={() => handleSizePizza(item.size)}
                        >
                          {item.title}
                        </Button>
                      ))}
                    </Flex>
                    <Flex
                      gap="10px"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Image
                        pt="20px"
                        transition="all 1s ease in out"
                        w={sizePizza}
                        src={pizza.image}
                      />
                      <Box>
                        <Text>{pizza.desc}</Text>
                        {user_prof.email ? (
                          <Text fontSize="20px" fontWeight="300">
                            от {pizza.priceUser} сом потому что вы зареганы
                          </Text>
                        ) : (
                          <Text fontSize="20px" fontWeight="300">
                            от {pizza.price} сом
                          </Text>
                        )}
                        {!user_prof.email && (
                          <Text fontSize="20px" fontWeight="300" color="orange">
                            {" "}
                            от {pizza.priceUser} сом для зарегестрированных
                          </Text>
                        )}
                      </Box>
                    </Flex>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      onClick={() => {
                        handleAddCart();
                        onClose();
                        toast({
                          title: "",
                          description: "Вы успешно добавили в корзину",
                          status: "success",
                          duration: 4000,
                          isClosable: true,
                        });
                      }}
                    >
                      В корзину
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Flex>
          </Box>
        </Flex>
      </Grid>
      <Flex gap="10px">
      </Flex>
    </Box>
  );
};

export default Card;
