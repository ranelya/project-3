import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return (
    <Box mt="140px" bg="#181818" w="100%" py={{ base: "50px", md: "30px", lg: "20px" }}>
      <Flex
        flexDir={{ base: "column", md: "row", lg: "row" }}
        alignItems="center"
        borderBottom="solid 1px #fff"
        justifyContent="space-between"
        px={{ base: "20px", md: "45px" }}
      >
        <Flex
          flexDir={{ base: "column", md: "row", lg: "row" }}
          p={{ base: "20px 0", md: "0", lg: "0" }}
          gap={{ base: "20px", md: "45px" }}
        >
          <Flex flexDirection="column" gap="7px">
            <Text color="#fff" as="p">
              огого Пицца
            </Text>
            <Link color="rgb(153, 153, 153)" textDecoration="none" href="">
              О нас
            </Link>
            <Link
              color="rgb(153, 153, 153)"
              textDecoration="none"
              href="https://dodopizza.kg/bishkek/ala-archa"
            >
              огого-книга
            </Link>
            <Link
              color="rgb(153, 153, 153)"
              textDecoration="none"
              href="https://sila-uma.ru/aboutdodo/"
            >
              Блог «Сила ума»
            </Link>
            <Link
              color="rgb(153, 153, 153)"
              textDecoration="none"
              href="https://dodo.dev/"
            >
              oгого ИС
            </Link>
          </Flex>
          <Flex flexDirection="column" gap="7px">
            <Text color="#fff" as="p">
              Работа
            </Text>
            <Link color="rgb(153, 153, 153)" textDecoration="none" href="">
              В пиццерии
            </Link>
          </Flex>
          <Flex flexDirection="column" gap="7px">
            <Text color="#fff" as="p">
              Партнерам
            </Text>
            <Link color="rgb(153, 153, 153)" textDecoration="none" href="">
              Предложить помещение
            </Link>
          </Flex>
          <Flex flexDirection="column" gap="7px">
            <Text color="#fff" as="p">
              Это интересно
            </Text>
            <Link color="rgb(153, 153, 153)" textDecoration="none" href="">
              Почему мы готовим без перчаток?
            </Link>
            <Link color="rgb(153, 153, 153)" textDecoration="none" href="">
              Экскурсии и мастер-классы
            </Link>
          </Flex>
        </Flex>
        <Flex alignItems="center">
          <Flex flexDir="column" p="20px">
            <Text as="span" fontWeight="400" fontSize="22px">
              0 (551) 550-550
            </Text>
            <Text fontWeight="300" fontSize="15px" color="rgb(153, 153, 153)">
              Звонок по телефону
            </Text>
            <Text fontWeight="300" fontSize="15px" color="rgb(153, 153, 153)">
              feedback@gogopizza.kg
            </Text>
            <Flex flexDirection="column" alignItems="center" pt="20px">
              <Text fontWeight="300" fontSize="15px" color="rgb(153, 153, 153)" marginBottom="15px">
                Принимаем к оплате
              </Text>
              <Image w="170px" src="/assets/Oshka.png" alt="oshka" />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex justifyContent="space-between" p="20px">
        <Flex gap="10px">
          <Text fontWeight="300" fontSize="15px" color="rgb(153, 153, 153)">
            OGOGO PIZZA
          </Text>
          <Text fontWeight="300" fontSize="15px" color="rgb(153, 153, 153)">
            © 2024
          </Text>
          <Link color="rgb(153, 153, 153)" textDecoration="none" href="">
            Правовая информация
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
