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
import { db } from "../FireBase-config";
import { v4 as uuidv4 } from "uuid";
import AdminComb from "./AdminComb";
import AdminBev from "./AdminBev";

function Admin() {
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

  const [pizzas, setPizzas] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPizza] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "ogogoPizzas"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let pizzaArr = [];
      querySnapshot.forEach((doc) => {
        pizzaArr.push({ ...doc.data(), id: doc.id });
      });
      setPizzas(pizzaArr);
    });
    return () => unsub();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      id: uuidv4(),
    });
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "ogogoPizzas", id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "ogogoPizzas"), formData);
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

  return (
    <Box>
      <Center flex flexDirection="column">
        <Text fontSize="30px">Панель пицц</Text>

        <form onSubmit={handleSubmit}>
          <Flex flexDirection="column" gap="10px" alignItems="center">
            <Box>
              <Input
                w={["100%", "100%", "800px"]}
                type="text"
                name="title"
                placeholder="Название продукта"
                value={formData.title}
                onChange={handleInputChange}
              />
            </Box>
            <Box>
              <Input
                w={["100%", "100%", "800px"]}
                type="text"
                name="type"
                placeholder="Тип продукта"
                value={formData.type}
                onChange={handleInputChange}
              />
            </Box>
            <Box>
              <Input
                w={["100%", "100%", "800px"]}
                type="text"
                name="desc"
                placeholder="Описание продукта"
                value={formData.desc}
                onChange={handleInputChange}
              />
            </Box>
            <Box>
              <Input
                w={["100%", "100%", "800px"]}
                type="text"
                name="price"
                placeholder="Цена продукта"
                value={formData.price}
                onChange={handleInputChange}
              />
            </Box>
            <Box>
              <Input
                w={["100%", "100%", "800px"]}
                type="text"
                name="priceUser"
                placeholder="Цена продукта для пользователей"
                value={formData.priceUser}
                onChange={handleInputChange}
              />
            </Box>
            <Box>
              <Input
                w={["100%", "100%", "800px"]}
                type="text"
                name="ingredients"
                placeholder="Ингредиенты продукта"
                value={formData.ingredients}
                onChange={handleInputChange}
              />
            </Box>
            <Box>
              <Input
                w={["100%", "100%", "800px"]}
                type="text"
                name="additions"
                placeholder="Дополнения продукта"
                value={formData.additions}
                onChange={handleInputChange}
              />
            </Box>
            <Box>
              <Input
                w={["100%", "100%", "800px"]}
                type="text"
                name="image"
                placeholder="картинка"
                value={formData.image}
                onChange={handleInputChange}
              />
            </Box>
            <Button w={["100%", "100%", "150px"]} type="submit">
              Отправить
            </Button>
          </Flex>
        </form>
      </Center>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing="20px" padding="20px">
        {pizzas.map((pizza) => (
          <Box key={pizza.id}>
            <Flex flexDirection="column" gap="10px">
              <Box width="100%" alignItems="center">
                <Image dropShadow="xl" w="100%" maxW="200px" margin="0 auto" src={pizza.image} />
                <Text pl="35px" fontSize="20px">
                  {pizza.title}
                </Text>
                <Text pl="35px" height="95px" maxH="90px">
                  {pizza.desc}
                </Text>
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  pt="20px"
                  pl="35px"
                  fontSize="20px"
                >
                  <Text>от {pizza.price} сом</Text>
                </Flex>
              </Box>
            </Flex>
            <Button
              marginLeft="25px"
              marginBottom="10px"
              mt="5px"
              onClick={() => handleDelete(pizza.id)}
            >
              Удалить
            </Button>
          </Box>
        ))}
      </SimpleGrid>
      <Modal onClose={() => setIsOpen(false)} size="xl" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          {currentPizza && (
            <>
              <ModalHeader>{currentPizza.title}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Flex
                  gap="10px"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Image pt="20px" w="200px" src={currentPizza.image} />
                  <Box>
                    <Text>{currentPizza.desc}</Text>
                    <Text fontSize="20px" fontWeight="300">
                      от {currentPizza.price} сом
                    </Text>
                  </Box>
                </Flex>
              </ModalBody>
              <ModalFooter>
                <Button onClick={() => setIsOpen(false)}>В корзину</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <hr />
      <AdminBev />
      <hr />
      <AdminComb />
    </Box>
  );
}

export default Admin;
