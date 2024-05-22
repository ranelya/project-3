import React, { useEffect, useState } from "react";
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
  SimpleGrid,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../FireBase-config";
import { useSelector } from "react-redux";

const Combo = () => {
  const [combos, setCombos] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = useState("md");
  const sizes = ["xl"];
  const user_prof = useSelector((state) => state.user);
  const [selectedBeverage, setSelectedBeverage] = useState(null);
  const [sizePizza] = useState(150); // Assuming the default size is 150

  useEffect(() => {
    const q = query(collection(db, "combo"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let comboArr = [];
      querySnapshot.forEach((doc) => {
        comboArr.push({ ...doc.data(), id: doc.id });
      });
      setCombos(comboArr);
      console.log(comboArr);
    });
    return () => unsub();
  }, []);

  const handleAddCart = async (obj) => {
    await addDoc(collection(db, "ogogoPzFav"), obj);
  };

  const handleSizeClick = (newSize, beverage) => {
    setSize(newSize);
    setSelectedBeverage(beverage);
    onOpen();
  };

  const toast = useToast();

  return (
    <SimpleGrid columns={[1, 2, 3, 4, 4]} spacing="40px" p="20px">
      {combos.map((pizza) => (
        <Box key={pizza.id} w="300px">
          <Box height="200px" mb="20px">
            <Image
              dropShadow="lg"
              w="200px"
              h="200px"
              objectFit="cover"
              src={pizza.image}
              transition="transform 0.3s"
              _hover={{ transform: "scale(1.1)" }}
            />
          </Box>
          <Text fontSize="20px" fontWeight="bold" mb="10px">
            {pizza.title}
          </Text>
          <Text fontSize="16px" mb="10px" maxHeight="40px" overflow="hidden">
            {pizza.desc}
          </Text>
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="20px" fontWeight="300">
              от {user_prof.email ? pizza.priceUser : pizza.price} сом
            </Text>
            {sizes.map((size) => (
              <Button
                key={size}
                bg="orange"
                onClick={() => handleSizeClick(size, pizza)}
              >
                Выбрать
              </Button>
            ))}
          </Flex>
        </Box>
      ))}
      <Modal onClose={onClose} size={size} isOpen={isOpen}>
        {selectedBeverage && (
          <>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{selectedBeverage.title}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Flex
                  gap="10px"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Image
                    pt="20px"
                    w={`${sizePizza}px`}
                    src={selectedBeverage.image}
                  />
                  <Box>
                    <Text>{selectedBeverage.desc}</Text>
                    {user_prof.email ? (
                      <Text fontSize="20px" fontWeight="300">
                        от {selectedBeverage.priceUser} сом потому что вы
                        зареганы
                      </Text>
                    ) : (
                      <Text fontSize="20px" fontWeight="300">
                        от {selectedBeverage.price} сом
                      </Text>
                    )}
                    {!user_prof.email && (
                      <Text fontSize="20px" fontWeight="300" color="red">
                        {" "}
                        от {selectedBeverage.priceUser} сом для
                        зарегестрированных
                      </Text>
                    )}
                  </Box>
                </Flex>
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={() => {
                    handleAddCart(selectedBeverage);
                    onClose();
                    toast({
                      title: "",
                      description: "вы успешно добавили в корзину",
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
          </>
        )}
      </Modal>
    </SimpleGrid>
  );
};

export default Combo;
