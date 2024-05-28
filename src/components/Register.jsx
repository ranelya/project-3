import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../store/Slices/userSlice";
import ModalRegister from "./ModalRegister";
import { Button } from "@chakra-ui/react";

const Register = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleRegister = async (email, password) => {
    if (password.length < 6) {
      setError("Пароль должен быть не менее 6 символов.");
      return;
    }

    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            token: user.accessToken,
            id: user.uid,
          })
        );
        setError(""); // Clear any previous errors
        setIsOpen(false); // Close the modal on successful registration
      })
      .catch((error) => {
        setError("Ошибка регистрации: " + error.message);
      });
  };

  return (
    <>
      <ModalRegister handleRegister={handleRegister} error={error} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Register;
