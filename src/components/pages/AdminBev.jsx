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
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { db } from "../FireBase-config";

const AdminBev = () => {
  const [beverages, setBeverages] = useState([]);
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

  const user_prof = useSelector((state) => state.user);

  const { isOpen, onClose } = useDisclosure();

  useEffect(() => {
    const q = query(collection(db, "Beverages"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let beveragesArr = [];
      querySnapshot.forEach((doc) => {
        beveragesArr.push({ ...doc.data(), id: doc.id });
      });
      setBeverages(beveragesArr);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "Beverages"), formData);
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

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "Beverages", id));
  };

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <Box>
      <Center pl="60px" py="60px" flex flexDirection="column">
        <Text fontSize="30px">Панель напитков</Text>

        <form onSubmit={handleSubmit}>
          <Flex flexDirection="column" gap="10px" alignItems="center">
            <Box>
              <Input
                w={["100%", "100%", "800px"]}
                type="text"
                name="title"
                placeholder="Название продукта"
                value={formData.title}
                onChange={(e) => handleInputChange(e)}
              />
            </Box>
            <Box>
              <Input
                w={["100%", "100%", "800px"]}
                type="text"
                name="type"
                placeholder="Тип продукта"
                value={formData.type}
                onChange={(e) => handleInputChange(e)}
              />
            </Box>
            <Box>
              <Input
                w={["100%", "100%", "800px"]}
                type="text"
                name="price"
                placeholder="Цена продукта"
                value={formData.price}
                onChange={(e) => handleInputChange(e)}
              />
            </Box>
            <Box>
              <Input
                w={["100%", "100%", "800px"]}
                type="text"
                name="priceUser"
                placeholder="Цена продукта для пользователей"
                value={formData.priceUser}
                onChange={(e) => handleInputChange(e)}
              />
            </Box>
            <Box>
              <Input
                w={["100%", "100%", "800px"]}
                type="text"
                name="image"
                placeholder="Картинка"
                value={formData.image}
                onChange={(e) => handleInputChange(e)}
              />
            </Box>
            <Button w={["100%", "100%", "150px"]} type="submit">
              Отправить
            </Button>
          </Flex>
        </form>
      </Center>
      <SimpleGrid pl={["0px", "20px", "30px", "40px"]} columns={[1, 2, 3, 4, 4]}>
        {beverages.map((beverage) => (
          <Box key={beverage.id}>
            <Flex pt="60px" flexDirection="column" gap="10px">
              <Box width="380px" alignItems="center" w="300px">
                <Image dropShadow="xl" w="200px" src={beverage.image} />
                <Text pl="35px" fontSize="20px">
                  {beverage.title}
                </Text>
                <Text pl="35px" height="100px">{beverage.desc}</Text>
                <Flex alignItems="center" pt="20px" pl="35px" fontSize="20px">
                  {user_prof.email ? (
                    <Text fontSize="20px" fontWeight="300">
                      от {beverage.priceUser} сом  
                    </Text>
                  ) : (
                    <Text fontSize="20px" fontWeight="300">
                      от {beverage.price} сом
                    </Text>
                  )}
                </Flex>
              </Box>
            </Flex>
            <Button ml="30px" mb="20px" mt="10px" onClick={() => handleDelete(beverage.id)}>Удалить</Button>
          </Box>
        ))}
      </SimpleGrid>
      <Modal onClose={handleCloseModal} size="xl" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Заголовок</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex gap="5px" alignItems="center">
              <Image pt="20px" w="100px" src={formData.image} />
              <Box>
                <Text>{formData.desc}</Text>
                {user_prof.email ? (
                  <Text fontSize="20px" fontWeight="300">
                    от {formData.priceUser} сом, так как вы зарегистрированы
                  </Text>
                ) : (
                  <Text fontSize="20px" fontWeight="300">
                                   от {formData.price} сом
                  </Text>
                )}
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleCloseModal}>Закрыть</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AdminBev;

