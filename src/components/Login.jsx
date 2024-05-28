import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import ModalLogin from "./ModalLogin";
import { setUser } from "../store/Slices/userSlice";
import { useDispatch } from "react-redux";
import { Button } from "@chakra-ui/react";

export const Login = () => {
  const dispatch = useDispatch();

  const handleLogIn = (email, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        dispatch(
          setUser({
            email: user.email,
            token: user.accessToken,
            id: user.uid,
            isAdmin, // Сохранение информации о том, что пользователь администратор
          })
        );
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          setError("Пользователь не найден. Пожалуйста, зарегистрируйтесь.");
        } else if (error.code === "auth/wrong-password") {
          setError("Неправильный пароль");
        } else {
          setError("Ошибка входа: " + error.message);
        }
      });
  };

  return <ModalLogin handleLogin={handleLogIn} />;
};

export default Login;
