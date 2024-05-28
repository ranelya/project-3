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
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password)
        .then(({ user }) => {
          console.log(user);
          dispatch(
            setUser({
              email: user.email,
              token: user.accessToken,
              id: user.uid,
            })
          );
        })
        .catch(console.error);
    };
//   console.log(ars);
  return <ModslRegister handleRegister={handleRegister} />;
};

export default Register;
