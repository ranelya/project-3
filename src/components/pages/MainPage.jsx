import React, { useEffect, useState } from "react";
import { Box,  SimpleGrid, Text } from "@chakra-ui/react";
import Card from "../Card";
import OftenOrdered from "../OftenOrdered";
import { db } from "../FireBase-config";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { useBreakpointValue } from "@chakra-ui/react";

const MainPage = () => {
  const [pizzas, setPizzas] = useState([]);
  const isWideScreen = useBreakpointValue({ base: false, md: true });

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

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "ogogoPizzas", id));
  };

  const handleComplete = async (pizza) => {
    await updateDoc(doc(db, "ogogoPizzas", pizza.id), {
      completed: !pizza.completed,
    });
  };

  const handleUpdate = async (pizza, title) => {
    await updateDoc(doc(db, "ogogoPizzas", pizza.id), { text: title });
  };

  return (
    <Box w="100%" maxW="1535px" mx="auto">
    {isWideScreen && (
      <>
        <Text pl={{ base: "20px", md: "30px" }} fontSize={{ base: "20px", md: "24px" }} fontWeight="100">
          Недавно добавленные
        </Text>
        <SimpleGrid columns={[1, 2, 2, 3, 4]} gap="20px" mx={{ base: "20px", md: "30px" }}>
          {pizzas.slice(0, 4).map((pizza) => (
            <OftenOrdered
              key={pizza.id}
              pizza={pizza}
              handleDelete={handleDelete}
              handleComplete={handleComplete}
              handleUpdate={handleUpdate}
            />
          ))}
        </SimpleGrid>
      </>
    )}

    <Text pl={{ base: "20px", md: "30px" }} fontSize={{ base: "24px", md: "30px" }} fontWeight="200">
      Pizza
    </Text>
    <SimpleGrid columns={[1, 2, 3, 4]} gap="20px" mx={{ base: "20px", md: "30px" }}>
      {pizzas.map((pizza) => (
        <Card
          key={pizza.id}
          pizza={pizza}
          handleDelete={handleDelete}
          handleComplete={handleComplete}
          handleUpdate={handleUpdate}
        />
      ))}
    </SimpleGrid>
  </Box>
  );
};

export default MainPage;
