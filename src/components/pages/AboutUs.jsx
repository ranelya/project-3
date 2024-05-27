import React from "react";
import { Box, Heading, Text, SimpleGrid, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const App = () => {
  return (
    <Box maxW="1440px" mx="auto" p={["20px", "40px", "60px", "80px"]}>
      <Box w="100%">
        <Heading fontWeight="600" color="orange" textAlign="center" fontSize={["24px", "32px", "40px"]}>
          Мы
        </Heading>
        <Text fontSize={["16px", "18px", "20px"]} fontWeight="200" pt="23px" textAlign="justify">
          Обычно люди приходят в Додо Пиццу, чтобы просто поесть. Наши промоутеры раздают листовки про кусочек пиццы или ещё что-то выгодное.
          Мы делаем это как первый шаг, чтобы познакомиться. Но для нас Додо — не только пицца. Это и пицца тоже, но в первую очередь это большое
          дело, которое вдохновляет нас, заставляет каждое утро просыпаться и с интересом продолжать работу. В чём же наш интерес? Сейчас расскажем.
        </Text>
        <Box pt="20px">
          <Box height={["300px", "400px", "600px", "828px"]} mb="20px">
            <Image borderRadius="10px" height="100%" width="100%" objectFit="cover" src="https://cdn.dodostatic.net/site-static/dist/67130451a949e975753f.jpg" />
          </Box>
          <SimpleGrid columns={[1, 2]} spacing="20px">
            <Box height={["200px", "300px", "400px"]}>
              <Image borderRadius="10px" height="100%" width="100%" objectFit="cover" src="https://cdn.dodostatic.net/site-static/dist/97114ed89637dc6f0832.jpg" />
            </Box>
            <Box height={["200px", "300px", "400px"]}>
              <Image borderRadius="10px" height="100%" width="100%" objectFit="cover" src="https://cdn.dodostatic.net/site-static/dist/2fa54610bf283e94faf1.jpg" />
            </Box>
          </SimpleGrid>
        </Box>
      </Box>
      <Box w="100%" pt="80px">
        <Heading fontWeight="600" textAlign="center" color="orange" fontSize={["24px", "32px", "40px"]}>
          Идеальные ингредиенты
        </Heading>
        <Text width="90%" textAlign="center" fontSize={["16px", "18px", "20px"]} fontWeight="200" pt="23px" mx="auto">
          Почему мы так хотим познакомиться? Потому что дальше пицца делает всё сама. Люди видят, что она вкусная, и возвращаются снова. Нам главное
          первый раз это показать. Вообще пицца — очень простая штука, её сложно испортить. Достаточно хороших ингредиентов и правильного теста. Это
          конструктор, если детали качественные, то и результат будет в порядке. Вот они, наши детали:
        </Text>
      </Box>
      <Box pt="50px">
        <SimpleGrid width="100%" columns={[1, 1, 2, 2]} spacing="20px" justifyContent="center">
          <MotionBox
            w="100%"
            borderRadius="15px"
            p={["10px", "15px", "20px"]}
            bg="rgb(253, 242, 232)"
            whileHover={{ scale: 1.1, rotate: 3 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Heading color="#Ec5e24" fontSize={["24px", "30px", "36px", "50px"]} fontWeight="600">
              Тесто
            </Heading>
            <Text color="#000" fontSize={["14px", "16px", "18px"]} fontWeight="400">
              Самая тонкая вещь. Главное - сделать его «живым». Это целый квест из граммов, градусов, процентов и часов с минутами. Процесс непростой, но у нас получается!
            </Text>
          </MotionBox>
          <MotionBox
            w="100%"
            borderRadius="15px"
            p={["10px", "15px", "20px"]}
            bg="rgb(253, 242, 232)"
            whileHover={{ scale: 1.1, rotate: -3 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Heading color="#Ec5e24" fontSize={["24px", "30px", "36px", "50px"]} fontWeight="600">
              Моцарелла
            </Heading>
            <Text color="#000" fontSize={["14px", "16px", "18px"]} fontWeight="400">
              Сыр в пицце - ключевой ингредиент. Мы используем настоящую моцареллу от российских поставщиков. Сыр должен тянуться, как на картинке.
            </Text>
          </MotionBox>
          <MotionBox
            w="100%"
            borderRadius="15px"
            p={["10px", "15px", "20px"]}
            bg="rgb(253, 242, 232)"
            whileHover={{ scale: 1.1, rotate: 3 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Heading color="#Ec5e24" fontSize={["24px", "30px", "36px", "50px"]} fontWeight="600">
              Начинка
            </Heading>
            <Text color="#000" fontSize={["14px", "16px", "18px"]} fontWeight="400">
              Есть два главных правила вкусной начинки: не экономить на начинке; фанатично соблюдать режим хранения. Это и весь секрет.
            </Text>
          </MotionBox>
          <MotionBox
            w="100%"
            borderRadius="15px"
            p={["10px", "15px", "20px"]}
            bg="rgb(253, 242, 232)"
            whileHover={{ scale: 1.1, rotate: -3 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Heading color="#Ec5e24" fontSize={["24px", "30px", "36px", "50px"]} fontWeight="600">
              Томатный соус
            </Heading>
            <Text color="#000" fontSize={["14px", "16px", "18px"]} fontWeight="400">
              Главное, что нужно знать про хороший томатный соус: он должен быть сделан из томатов. Звучит логично, но задумайтесь!
            </Text>
          </MotionBox>
        </SimpleGrid>
      </Box>
      <Box w="100%" pt="80px">
        <Heading fontWeight="600" textAlign="center" color="orange" fontSize={["24px", "32px", "40px"]}>
          Одинаково вкусно в Бишкеке и Караколе
        </Heading>
        <Text fontSize={["16px", "18px", "20px"]} fontWeight="200" pt="23px" textAlign="justify">
          Кто угодно может сделать вкусную пиццу. А шеф-повар итальянского ресторана сделает и вовсе шедевр. Он молодец. Но представьте, что вам нужно сделать вкусную пиццу в сотнях пиццерий, за сотни километров друг от друга. Это наш случай, у нас их вон уже сколько: Пицца должна быть вкусной и везде одинаковой. Пиццерии должны быть одинаково уютными, кассиры неизменно приветливыми, а курьеры — расторопными. И это как раз сложно. Но мы умеем!
        </Text>
      </Box>
      <Box w="100%" pt="80px">
        <Heading fontWeight="600" textAlign="center" color="orange" fontSize={["24px", "32px", "40px"]}>
          Единые стандарты
        </Heading>
        <Text fontSize={["16px", "18px", "20px"]} fontWeight="200" pt="23px" textAlign="justify">
          Цифровые технологии помогают нам вовремя замечать, если что-то идёт неправильно. Но как понять, что правильно, а что нет? Для этого у нас есть стандарты. Вот, например, про мытьё рук:
        </Text>
      </Box>
      <Box pt="30px">
        <Box
          width={["100%", "90%", "80%", "860px"]}
          mx="auto"
          height="auto"
          borderRadius="7px"
          p="10px"
          bg="rgb(253, 242, 232)"
        >
          <Text color="#000" fontSize={["14px", "16px", "18px"]}>
            <Text color="#Ec5e24" fontSize={["18px", "20px"]} textAlign="center" fontWeight="600">
              ПРАВИЛО №100500 ПРО МЫТЬЕ РУК
            </Text>
            Выход из кухни сделал уборку поправил прическу коснулся одежды почесал нос считал деньги
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default App;
