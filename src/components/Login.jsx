import React from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import ModalLogin from "./ModalLogin";
import { setUser } from "../store/Slices/userSlice";
import { useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";

const Login = () => {
  const toast = useToast();
  const statuses = ["error"];

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
          })
        );
      })
      .catch(console.error);
  };

  return <ModalLogin handleLogin={handleLogIn} />;
};

export default Login;
