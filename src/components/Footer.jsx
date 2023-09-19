import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return (
    <Box mt="140px" bg="#181818" w={["410px", "500px","766px","1024px","100%"]} height="100%">
      <Flex
        flexDir={{ base: "column", md: "row", lg: "row" }}
        alignItems="center"
        borderBottom="solid 1px #fff"
        justifyContent="space-between"
      >
        <Flex
          flexDir={{ base: "column", md: "row", lg: "row" }}
          p="45px"
          gap="45px"
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
        <Flex>
          <Flex p="30px" flexDir="column">
            <Text as="span" fontWeight="400" fontSize="22px">
              0 (551) 550-550
            </Text>
            <Text
              as="span"
              fontWeight="300"
              fontSize="15px"
              color="rgb(153, 153, 153)"
            >
              Звонок по телефону
            </Text>
            <Text
              as="span"
              fontWeight="300"
              fontSize="15px"
              color="rgb(153, 153, 153)"
            >
              feedback@gogopizza.kg
            </Text>
            <Flex flexDirection="column" alignItems="center" pt="50px">
              <Text
                as="span"
                fontWeight="300"
                fontSize="15px"
                color="rgb(153, 153, 153)"
              >
                Принимаем к оплате
              </Text>
              <Image w="300px" src="/assets/Oshka.png" alt="oshka" />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex>
        <Flex gap="10px" p="20px">
          <Text
            as="span"
            fontWeight="300"
            fontSize="15px"
            color="rgb(153, 153, 153)"
          >
            OGOGO PIZZA
          </Text>
          <Text
            as="span"
            fontWeight="300"
            fontSize="15px"
            color="rgb(153, 153, 153)"
          >
            © 2023
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
