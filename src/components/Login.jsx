import React from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import ModalLogin from "./ModalLogin";
import { setUser } from "../store/Slices/userSlice";
import { useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";

const Login = () => {
  const dispatch = useDispatch();
  const toast = useToast(); // добавляем useToast для вывода уведомлений

  const handleLogIn = (email, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);

        // Проверка на администратора
        const isAdmin = user.email === "adminp@gmail.com";

        dispatch(
          setUser({
            email: user.email,
            token: user.accessToken,
            id: user.uid,
            isAdmin: isAdmin,
          })
        );

        // Успешный вход
        toast({
          title: "Вход выполнен успешно",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch(error => {
        console.error("Ошибка входа:", error);

        // Ошибка входа
        toast({
          title: "Ошибка входа",
          description: "Проверьте правильность email и пароля",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  return <ModalLogin handleLogin={handleLogIn} />;
};

export default Login;
