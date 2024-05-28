import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import ModalLogin from "./ModalLogin";
import { setUser } from "../store/Slices/userSlice";
import { useDispatch } from "react-redux";

export const Login = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const adminEmail = "adminp@gmail.com"; // Определите e-mail администратора

  const handleLogIn = (email, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        const isAdmin = user.email === adminEmail; // Проверка на администратора
        dispatch(
          setUser({
            email: user.email,
            token: user.accessToken,
            id: user.uid,
            isAdmin, // Сохранение информации о том, что пользователь администратор
          })
        );
        setError(""); // Очистить ошибки
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

  return <ModalLogin handleLogin={handleLogIn} error={error} />;
};

export default Login;
