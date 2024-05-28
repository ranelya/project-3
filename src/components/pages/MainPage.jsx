import React, { useEffect, useState } from "react";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import Card from "../Card";
import OftenOrdered from "../OftenOrdered";
import { db } from "../FireBase-config";
import { collection, deleteDoc, doc, onSnapshot, query, updateDoc } from "firebase/firestore";
import "./Main.css"; // Добавляем импорт CSS файла

const MainPage = () => {
  const [pizzas, setPizzas] = useState([]);

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
    <Box w="100%" maxW="2000px" mx="auto" className="main-container">
      <div className="recently-added">
        <Text className="section-title">Недавно добавленные</Text>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing="20px">
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
      </div>

      <Text className="section-title">Пицца</Text>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="20px">
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
