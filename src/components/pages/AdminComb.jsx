import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Input,
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
} from "@chakra-ui/react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../FireBase-config";
import { v4 as uuidv4 } from "uuid";
import { NavLink } from "react-router-dom";

const AdminComb = () => {
  const [formData, setFormData] = useState({
    id: "",
    type: "",
    title: "",
    desc: "",
    price: "",
    priceUser: "",
    ingredients: "",
    additions: "",
    image: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "combo"), formData);

    setFormData({
      id: "",
      type: "",
      title: "",
      desc: "",
      price: "",
      priceUser: "",
      ingredients: "",
      additions: "",
      image: "",
    });
  };

  const [combos, setCombos] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "combo"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let comboArr = [];
      querySnapshot.forEach((doc) => {
        comboArr.push({ ...doc.data(), id: doc.id });
      });
      setCombos(comboArr);
    });
    return () => unsub();
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = useState("md");
  const [currentPizza, setCurrentPizza] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      id: uuidv4(),
    });
  };

  const handleSizeClick = (newSize, pizza) => {
    setSize(newSize);
    setCurrentPizza(pizza);
    onOpen();
  };

  const sizes = ["xl"];

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "combo", id));
  };

  return (
    <Box>
      <Center pl="60px" py="60px" flex flexDirection="column">
        <Text fontSize="30px">Dessert Panel</Text>

        <form onSubmit={handleSubmit}>
          <Flex flexDirection="column" gap="10px" alignItems="center">
            <Box>
              <Input
                w="800px"
                type="text"
                name="title"
                placeholder="Название продукта"
                value={formData.title}
                onChange={handleInputChange}
              />
            </Box>
            <Box>
              <Input
                w="800px"
                type="text"
                name="type"
                placeholder="Тип продукта"
                value={formData.type}
                onChange={handleInputChange}
              />
            </Box>
            <Box>
              <Input
                w="800px"
                type="text"
                name="desc"
                placeholder="Описание продукта"
                value={formData.desc}
                onChange={handleInputChange}
              />
            </Box>
            <Box>
              <Input
                w="800px"
                type="text"
                name="price"
                placeholder="Цена продукта"
                value={formData.price}
                onChange={handleInputChange}
              />
            </Box>
            <Box>
              <Input
                w="800px"
                type="text"
                name="priceUser"
                placeholder="Цена продукта для пользователей сайта"
                value={formData.priceUser}
                onChange={handleInputChange}
              />
            </Box>
            <Box>
              <Input
                w="800px"
                type="text"
                name="ingredients"
                placeholder="Ингредиенты продукта"
                value={formData.ingredients}
                onChange={handleInputChange}
              />
            </Box>
            <Box>
              <Input
                w="800px"
                type="text"
                name="additions"
                placeholder="Дополнения продукта"
                value={formData.additions}
                onChange={handleInputChange}
              />
            </Box>
            <Box>
              <Input
                w="800px"
                type="text"
                name="image"
                placeholder="Картинка"
                value={formData.image}
                onChange={handleInputChange}
              />
            </Box>
            <Button w="150px" type="submit">
              Отправить
            </Button>
          </Flex>
        </form>
      </Center>
      <SimpleGrid
        pl={["0px", "20px", "30px", "40px"]}
        columns={[1, 2, 3, 4, 4]}
      >
        {combos.map((pizza) => (
          <Box key={pizza.id}>
            <Flex pt="60px" flexDirection="column" gap="10px">
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
                  <Text>от {pizza.price} сом</Text>
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
                  <Modal onClose={onClose} size={size} isOpen={isOpen}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>{currentPizza?.title}</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <Flex
                          gap="10px"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Image
                            pt="20px"
                            w="200px"
                            src={currentPizza?.image}
                          />
                          <Box>
                            <Text>{currentPizza?.desc}</Text>
                            <Text fontSize="20px" fontWeight="300">
                              от {currentPizza?.price} сом
                            </Text>
                          </Box>
                        </Flex>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          onClick={() => {
                            onClose();
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
            <Button onClick={() => handleDelete(pizza.id)}>Delete</Button>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default AdminComb;
