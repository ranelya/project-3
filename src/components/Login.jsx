import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import ModalLogin from "./ModalLogin";
import { setUser } from "../store/Slices/userSlice";
import { useDispatch } from "react-redux";
import { Button } from "@chakra-ui/react";

const Login = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleLogIn = (email, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            token: user.accessToken,
            id: user.uid,
          })
        );
        setError(""); // Clear any previous errors
        setIsOpen(false); // Close the modal on successful login
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

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Войти</Button>
      <ModalLogin handleLogin={handleLogIn} error={error} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Login;
