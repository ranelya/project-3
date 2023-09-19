import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "./FireBase-config";
import { useSelector } from "react-redux";

const OftenOrdered = ({
  pizza,
  handleDelete,
  handleComplete,
  handleUpdate,
}) => {
  let arr = [
    {
      title: "маленькая",
      size: 150,
    },
    {
      title: "средний",
      size: 200,
    },
    {
      title: "большой",
      size: 250,
    },
  ];
  const [sizePizza, setSizePizza] = useState(arr[0].size);

  const handleSizePizza = (sizePizza) => {
    setSizePizza(sizePizza);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = useState("xl");
  // const [favPizza, setFavPizza] = useState(null);
  const handleSizeClick = (newSize) => {
    setSize(newSize);
    onOpen();
  };
  const handleAddCart = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "ogogoPzFav"), pizza);
  };
  const user_prof = useSelector((state) => state.user);

  return (
    <Box pl="30px">
      <Button
        boxShadow="xl"
        _hover={{
          boxShadow: "sm",
        }}
        flex
        flexDirection="row"
        gap="10px"
        justifyContent="start"
        pt="50px"
        pb="50px"
        w={["33%", "33%", "30%", "270px"]}
        onClick={() => handleSizeClick(size)}
        key={size}
        m={4}
      >
        <Image m="0" w="80px" src={pizza.image} alt="pizza" />
        <Box>
          <Box p="20px">
            <Text
              fontSize="13px"
              display={{ base: "none", sm: "none", lg: "block", md: "none" }}
            >
              {pizza.title}
            </Text>
            {user_prof.email ? (
              <Text
                display={{ base: "none", sm: "none", lg: "block", md: "none" }}
                fontSize="13px"
              >
                {pizza.priceUser} сом
              </Text>
            ) : (
              <Text
                display={{ base: "none", sm: "none", lg: "block", md: "none" }}
                fontSize="13px"
              >
                {pizza.price} сом
              </Text>
            )}
          </Box>
        </Box>
      </Button>
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
            <Flex gap="10px" alignItems="center" justifyContent="space-between">
              <Image
                pt="20px"
                src={pizza.image}
                transition="all 1s ease in out"
                w={sizePizza}
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
                  <Text fontSize="20px" fontWeight="300" color="red">
                    {" "}
                    от {pizza.priceUser} сом для зарегестрированных
                  </Text>
                )}
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleAddCart}>В корзину</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default OftenOrdered;
