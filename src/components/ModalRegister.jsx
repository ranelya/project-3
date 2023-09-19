import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ModalLogin from "./ModalLogin";

const ModslRegister = ({ handleRegister }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleClickForm = () => {
    handleRegister(email, pass);
    onClose();
    setEmail("");
    setPass("");
  };

  return (
    <Box>
      <Button onClick={onOpen}>Зарегистрироваться</Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                ref={initialRef}
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Your password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => {
                handleClickForm();
              }}
              colorScheme="orange"
              mr={3}
            >
              register
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ModslRegister;
