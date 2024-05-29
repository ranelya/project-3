import React from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import ModalLogin from "./ModalLogin";
import ModalRegister from "./ModalRegister";
import { setUser } from "../store/Slices/userSlice";
import { useDispatch } from "react-redux";
import { useToast, Button } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

const Login = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure();
  const { isOpen: isRegisterOpen, onOpen: onRegisterOpen, onClose: onRegisterClose } = useDisclosure();

  const handleLogIn = (email, password) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        const isAdmin = user.email === "adminp@gmail.com";
        dispatch(
          setUser({
            email: user.email,
            token: user.accessToken,
            id: user.uid,
            isAdmin: isAdmin,
          })
        );
        toast({
          title: "Вход выполнен успешно",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onLoginClose();
      });
  };

  const handleRegister = (email, password) => {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        const isAdmin = user.email === "adminp@gmail.com";
        dispatch(
          setUser({
            email: user.email,
            token: user.accessToken,
            id: user.uid,
            isAdmin: isAdmin,
          })
        );
        toast({
          title: "Регистрация выполнена успешно",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onRegisterClose();
      });
  };

  return (
    <div>
      <Button onClick={onLoginOpen}>Войти</Button>
      <Button onClick={onRegisterOpen} ml={4}>Зарегистрироваться</Button>
      <ModalLogin isOpen={isLoginOpen} onClose={onLoginClose} handleLogin={handleLogIn} />
      <ModalRegister isOpen={isRegisterOpen} onClose={onRegisterClose} handleRegister={handleRegister} />
    </div>
  );
};

export default Login;
