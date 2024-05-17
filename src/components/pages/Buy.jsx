import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";
const Buy = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const finalRef = React.useRef(null);
 
  return (
    <Box>
      <Box m="auto" w="500px" pl="60px">
        <Heading fontSize="23px" fontWeight="300">
          Заказ
        </Heading>
        <Flex pt="20px" gap="10px" flexDirection="column">
          <Input w="300px" type="text" placeholder="Имя и фамилия" required />
          <Input w="300px" type="text" placeholder="Ваш адрес" required />

          <Button w="100px" mt={4} onClick={onOpen}>
            оплатить
          </Button>
          <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Modal Title</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>Способы оплаты</Text>
                <Flex pt="20px" flexDirection="column" gap="10px">
                  <NavLink to="/buycard">
                    <Button w="400px">Картой</Button>
                  </NavLink>

                  <Button
                    onClick={() =>
                      toast({
                        title: "",
                        description: "Ваш заказ приедет в течении 30 минут",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                      })
                    }
                  >
                    Наличкой
                  </Button>
                </Flex>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Flex>
      </Box>
     </Box>
  );
};

export default Buy;
