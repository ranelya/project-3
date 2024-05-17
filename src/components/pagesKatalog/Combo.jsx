import {
  Box,
  Button,
  Flex,
  Grid,
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
import React, { useEffect, useState } from "react";
import { db } from "../FireBase-config";
import { useSelector } from "react-redux";

const Combo = () => {
  const [combos, setCombos] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = useState("md");
  const sizes = ["xl"];
  const user_prof = useSelector((state) => state.user);
  const [selectedBeverage, setSelectedBeverage] = useState(null);
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
  const [sizePizza] = useState(arr[0].size);
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
    return () => unsub;
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
    <Box>
      <Text pl="30px" fontSize="30px" fontWeight="200">
        Dessert
      </Text>
      <SimpleGrid pt="20px" columns={[1, 2, 3, 4, 4]}>
        {combos.map((pizza) => (
          <Box p="12px" key={pizza.id}>
            <Grid templateColumns="repeat(4, 1fr)">
              <Flex flexDirection="column" gap="10px">
                <Box width="380px" height="300px" alignItems="center" w="300px">
                  <Box height="200px">
                    <Image dropShadow="xl" w="200px" src={pizza.image} />
                  </Box>
                  <Text pl="35px" fontSize="20px">
                    {pizza.title}
                  </Text>
                  <Text height="70px" pl="35px">
                    {pizza.desc}
                  </Text>
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
                        bg="orange"
                        onClick={() => handleSizeClick(size, pizza)}
                        key={size}
                        m={4}
                      >
                        Выбрать
                      </Button>
                    ))}
                  </Flex>
                </Box>
              </Flex>
            </Grid>
            <Flex gap="10px"></Flex>
          </Box>
        ))}
      </SimpleGrid>
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
                  <Image pt="20px" w={sizePizza} src={selectedBeverage.image} />
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
    </Box>
  );
};

export default Combo;
