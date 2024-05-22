import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
const AboutUs = () => {
  // const cards = [
  //   {
  //     title: 'Итальянская Классика',
  //     text: 'Попробуйте настоящую итальянскую пиццу с хрустящей корочкой и ароматными начинками.',
  //    image: '',
  //   },
  //   {
  //     title: 'Свежие Ингредиенты',
  //     text: 'Мы используем только свежие и качественные ингредиенты для нашей пиццы.',
  //     image: 'https://ouch-cdn2.icons8.com/hn0pyuiVMt6HAqmUMRyuy5b01RjtyOUMn7CB4i5FQkE/skp:webm/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy92aWRlb3Mv/NDQvOTczOGZmYzMt/ZDY4NS00MTM5LTlh/ZTQtM2I1Y2RjYTg5/MTI3LndlYm0.webm',
  //   },
  //   {
  //     title: 'Для Настоящих Гурманов',
  //     text: 'Насладитесь эксклюзивными рецептами пиццы, разработанными нашими шеф-поварами.',
  //     image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  //   },
  //   {
  //     title: 'Быстрая Доставка',
  //     text: 'Горячая пицца прямо к вашему столу в кратчайшие сроки.',
  //     image: 'https://img.freepik.com/free-photo/a-front-view-young-female-courier-female-worker-of-food-delivery-service-holding-coffee-cups-food-packages-showing-phone-call-sign-on-white_140725-19992.jpg',
  //   },
  // ];

  return (
    <>
    {/* <CaptionCarousel cards={cards} /> */}
    <Box maxW="1440px">
      <Box pl="60px" w={["300px", "400px", "500px", "100%"]}>
        <Heading fontWeight="300">Мы</Heading>
        <Text fontSize="20px" fontWeight="200px" pt="23px">
          Обычно люди приходят в Додо Пиццу, чтобы просто поесть. Наши
          промоутеры раздают листовки про кусочек пиццы или ещё что-то выгодное.
          Мы делаем это как первый шаг, чтобы познакомиться. Но для нас Додо —
          не только пицца. Это и пицца тоже, но в первую очередь это большое
          дело, которое вдохновляет нас, заставляет каждое утро просыпаться и с
          интересом продолжать работу. В чём же наш интерес? Сейчас расскажем.
        </Text>
      </Box>
      <Box w={["300px", "400px", "500px", "100%"]} pl="60px" pt="80px">
        <Heading fontWeight="300">Идеальные ингредиенты</Heading>
        <Text fontSize="20px" fontWeight="200px" pt="23px">
          Почему мы так хотим познакомиться? Потому что дальше пицца делает всё
          сама. Люди видят, что она вкусная, и возвращаются снова. Нам главное
          первый раз это показать. Вообще пицца — очень простая штука, её сложно
          испортить. Достаточно хороших ингредиентов и правильного теста. Это
          конструктор, если детали качественные, то и результат будет в порядке.
          Вот они, наши детали:
        </Text>
      </Box>
      <Box pt="50px" pl="60px">
        <SimpleGrid
          w={["200px", "300px", "350px", "700px"]}
          columns={[1, 2, 2, 2]}
          gap="20px"
        >
          <Box borderRadius="7px" p="10px" bg="rgb(253, 242, 232)">
            <Text color="#000" fontSize="14px">
              <Heading color="#Ec5e24" fontSize="23px" fontWeight="300">
                Тесто
              </Heading>
              Самая тонкая вещь. Главное - сделать его «живым». Это целый квест
              из граммов, градусов, процентов и часов с минутами. Процесс
              непростой, но у нас получается!
            </Text>
          </Box>
          <Box borderRadius="7px" p="10px" bg="rgb(253, 242, 232)">
            <Text color="#000" fontSize="14px">
              <Heading color="#Ec5e24" fontSize="23px" fontWeight="300">
                Моцарелла
              </Heading>
              Сыр в пицце - ключевой ингредиент. Мы используем настоящую
              моцареллу от российских поставщиков. Сыр должен тянуться, как на
              картинке.
            </Text>
          </Box>
          <Box borderRadius="7px" p="10px" bg="rgb(253, 242, 232)">
            <Text color="#000" fontSize="14px">
              <Heading color="#Ec5e24" fontSize="23px" fontWeight="300">
                Начинка
              </Heading>
              Есть два главных правила вкусной начинки: не экономить на начинке;
              фанатично соблюдать режим хранения. Это и весь секрет.
            </Text>
          </Box>
          <Box borderRadius="7px" p="10px" bg="rgb(253, 242, 232)">
            <Text color="#000" fontSize="14px">
              <Heading color="#Ec5e24" fontSize="23px" fontWeight="300">
                Томатный соус
              </Heading>
              Главное, что нужно знать про хороший томатный соус: он должен быть
              сделан из томатов. Звучит логично, но задумайтесь!
            </Text>
          </Box>
        </SimpleGrid>
      </Box>
      <Box w={["300px", "400px", "500px", "100%"]} pl="60px" pt="80px">
        <Heading fontWeight="300">
          Одинаково вкусно в Москве и Сыктывкаре
        </Heading>
        <Text fontSize="20px" fontWeight="200px" pt="23px">
          Кто угодно может сделать вкусную пиццу. А шеф-повар итальянского
          ресторана сделает и вовсе шедевр. Он молодец. Но представьте, что вам
          нужно сделать вкусную пиццу в сотнях пиццерий, за сотни километров
          друг от друга. Это наш случай, у нас их вон уже сколько: Пицца должна
          быть вкусной и везде одинаковой. Пиццерии должны быть одинаково
          уютными, кассиры неизменно приветливыми, а курьеры — расторопными. И
          это как раз сложно. Но мы умеем!
        </Text>
      </Box>
      <Box w={["300px", "400px", "500px", "100%"]} pl="60px" pt="80px">
        <Heading fontWeight="300">Единые стандарты</Heading>
        <Text fontSize="20px" fontWeight="200px" pt="23px">
          Цифровые технологии помогают нам вовремя замечать, если что-то идёт
          неправильно. Но как понять, что правильно, а что нет? Для этого у нас
          есть стандарты. Вот, например, про мытьё рук:
        </Text>
      </Box>
      <Box pl="60px" pt="30px">
        <Box
          w={["300px", "400px", "500px", "800px"]}
          borderRadius="7px"
          p="10px"
          bg="rgb(253, 242, 232)"
        >
          <Text color="#000" fontSize="14px">
            <Text color="#Ec5e24" fontSize="15px" fontWeight="300">
              ПРАВИЛО №100500 ПРО МЫТЬЕ РУК
            </Text>
            Выход из кухни сделал уборку поправил прическу коснулся одежды 
            почесал нос считал диеньги
          </Text>
        </Box>
      </Box>
    </Box>
    </>
  );
};

export default AboutUs;
