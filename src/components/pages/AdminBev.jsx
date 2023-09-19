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

  const user_prof = useSelector((state) => state.user);

  const [currentPizza, setCurrentPizza] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "Beverages"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let BeveragesArr = [];
      querySnapshot.forEach((doc) => {
        BeveragesArr.push({ ...doc.data(), id: doc.id });
      });
      setBeverages(BeveragesArr);
    });
    return () => unsub();
  }, []);

  const handleOpenModal = (pizza) => {
    setCurrentPizza(pizza);
    onOpen();
  };

  const handleCloseModal = () => {
    setCurrentPizza(null);
    onClose();
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
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      id: uuidv4(),
    });
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  const sizes = ["xl"];

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "Beverages", id));
  };
  const handleSizePizza = (sizePizza) => {
    setSizePizza(sizePizza);
  };
  return (
    <Box>
      <Center pl="60px" py="60px" flex flexDirection="column">
        <Text fontSize="30px">Drinks Panel</Text>

        <form onSubmit={handleSubmit}>
          <Flex flexDirection="column" gap="10px" alignItems="center">
            <Box>
              <Input
                w="800px"
                type="text"
                name="title"
                placeholder="Название продукта"
                value={formData.title}
                onChange={(e) => handleInputChange(e, "title")}
              />
            </Box>
            <Box>
              <Input
                w="800px"
                type="text"
                name="type"
                placeholder="Тип продукта"
                value={formData.type}
                onChange={(e) => handleInputChange(e, "type")}
              />
            </Box>

            <Box>
              <Input
                w="800px"
                type="text"
                name="price"
                placeholder="Цена продукта"
                value={formData.price}
                onChange={(e) => handleInputChange(e, "price")}
              />
            </Box>
            <Box>
              <Input
                w="800px"
                type="text"
                name="priceUser"
                placeholder="Цена продукта для пользователей"
                value={formData.priceUser}
                onChange={(e) => handleInputChange(e, "priceUser")}
              />
            </Box>

            <Box>
              <Input
                w="800px"
                type="text"
                name="image"
                placeholder="картинка"
                value={formData.image}
                onChange={(e) => handleInputChange(e, "image")}
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
        {beverages.map((pizza) => (
          <Box key={pizza.id}>
            <Flex pt="60px" flexDirection="column" gap="10px">
              <Box width="380px" alignItems="center" w="300px">
                <Image dropShadow="xl" w="200px" src={pizza.image} />
                <Text pl="35px" fontSize="20px">
                  {pizza.title}
                </Text>
                <Text pl="35px">{pizza.desc}</Text>
                <Flex alignItems="center" pt="20px" pl="35px" fontSize="20px">
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
                      onClick={() => handleOpenModal(pizza)}
                      key={size}
                      m={4}
                    >
                      Выбрать
                    </Button>
                  ))}
                </Flex>
              </Box>
            </Flex>
            <Button onClick={() => handleDelete(pizza.id)}>Delete</Button>
          </Box>
        ))}
      </SimpleGrid>
      <Modal onClose={handleCloseModal} size="xl" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          {currentPizza && (
            <>
              <ModalHeader>{currentPizza.title}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {/* {arr.map((item, index) => (
                  <Button
                    bg="orange"
                    key={index}
                    onClick={() => handleSizePizza(item.size)}
                  >
                    {item.title}
                  </Button>
                ))} */}
                <Flex
                  gap="5px"
                  alignItems="center"
                  // justifyContent="space-between"
                >
                  <Image pt="20px" w={sizePizza} src={currentPizza.image} />
                  <Box>
                    <Text>{currentPizza.desc}</Text>
                    {user_prof.email ? (
                      <Text fontSize="20px" fontWeight="300">
                        от {currentPizza.priceUser} сом потому что вы зареганы
                      </Text>
                    ) : (
                      <Text fontSize="20px" fontWeight="300">
                        от {currentPizza.price} сом
                      </Text>
                    )}
                    
                  </Box>
                </Flex>
              </ModalBody>
              <ModalFooter>
                <Button onClick={handleCloseModal}>Закрыть</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AdminBev;
