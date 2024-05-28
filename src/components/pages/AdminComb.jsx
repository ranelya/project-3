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

  const { isOpen, onClose } = useDisclosure();
  const [size] = useState("md");
  const [currentPizza] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      id: uuidv4(),
    });
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "combo", id));
  };

  return (
    <Box>
      <Center pl={["10px", "60px"]} py="60px" flex flexDirection="column">
        <Text fontSize="30px">Панель Десертов</Text>

        <form onSubmit={handleSubmit}>
          <Flex flexDirection={["column", "column", "row"]} gap="10px" alignItems={["center", "center", "flex-start"]}>
            <Box>
              <Input
                w="100%"
                type="text"
                name="title"
                placeholder="Название продукта"
                value={formData.title}
                onChange={handleInputChange}
              />
            </Box>
            <Box>
              <Input
                w="100%"
                type="text"
                name="type"
                placeholder="Тип продукта"
                value={formData.type}
                onChange={handleInputChange}
              />
            </Box>
            <Box>
              <Input
                w="100%"
                type="text"
                name="desc"
                placeholder="Описание продукта"
                value={formData.desc}
                onChange={handleInputChange}
              />
            </Box>
            <Box>
              <Input
                w="100%"
                type="text"
                name="price"
                placeholder="Цена продукта"
                value={formData.price}
                onChange={handleInputChange}
              />
            </Box>
            <Box>
              <Input
                w="100%"
                type="text"
                name="priceUser"
                placeholder="Цена продукта для пользователей сайта"
                value={formData.priceUser}
                onChange={handleInputChange}
              />
            </Box>
            <Box>
              <Input
                w="100%"
                type="text"
                name="ingredients"
                placeholder="Ингредиенты продукта"
                value={formData.ingredients}
                onChange={handleInputChange}
              />
            </Box>
            <Box>
              <Input
                w="100%"
                type="text"
                name="additions"
                placeholder="Дополнения продукта"
                value={formData.additions}
                onChange={handleInputChange}
              />
            </Box>
            <Box>
              <Input
                w="100%"
                type="text"
                name="image"
                placeholder="Картинка"
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
      <SimpleGrid
        pl={["0px", "20px", "30px", "40px"]}
        columns={[1, 2, 3, 4, 4]}
      >
        {combos.map((combo) => (
          <Box key={combo.id}>
            <Flex pt="60px" flexDirection="column" gap="10px">
              <Box
                width={["100%", "100%", "400px"
              ]}
              alignItems="center"
              w={["100%", "100%", "300px"]}
            >
              <Image
                dropShadow="xl"
                w="200px"
                margin="0 auto"
                transition="transform 0.3s"
                _hover={{ transform: 'scale(1.1)' }}
                src={combo.image}
              />
              <Text pl="20px" fontSize="20px" fontWeight="600">
                {combo.title}
              </Text>
              <Text pl="20px" height="90px" maxHeight="95px">{combo.desc}</Text>
              <Flex
                alignItems="center"
                justifyContent="space-between"
                pt="20px"
                pl="20px"
                fontSize="20px"
              >
                <Text>от {combo.price} сом</Text>
              </Flex>
            </Box>
          </Flex>
          <Button
            marginLeft="18px"
            onClick={() => handleDelete(combo.id)}
          >
            Удалить
          </Button>
        </Box>
      ))}
    </SimpleGrid>
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
  </Box>
);
};

export default AdminComb;
