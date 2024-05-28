import React from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../store/Slices/userSlice";
import ModslRegister from "./ModalRegister";
const Register = () => {
  const dispatch = useDispatch();

   

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
