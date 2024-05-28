import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
  Box
} from "@chakra-ui/react";

const ModalLogin = ({ handleLogin, error, isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Вход</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={onSubmit}>
            <FormControl id="email" mb={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormControl>
            <FormControl id="password" mb={4}>
              <FormLabel>Пароль</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormControl>
            {error && (
              <Box mb={4}>
                <Alert status="error">
                  <AlertIcon />
                  {error}
                </Alert>
              </Box>
            )}
            <Button type="submit" colorScheme="blue" width="full">
              Войти
            </Button>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Закрыть
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalLogin;
