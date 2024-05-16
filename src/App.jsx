import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import "./index.css";
import RouteProvider from "./components/common/RouteProvider";
import Katalog from "./components/Katalog";
import Card from "./components/Card";
import Footer from "./components/Footer";
import Cookies from "universal-cookie";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "./components/FireBase-config";
import MainPage from "./components/pages/MainPage";
import { useSelector } from "react-redux";
import NotFoundPage from "./components/pages/NotFoundPage";

const App = () => {
  const [user, setUser] = useState(null);
  
  const prof = useSelector((state) => state.user);
  let cookie = new Cookies();
  cookie.get("auth-token", prof)
  // cookie.get("auith-token", prof)
  console.log(prof);

  // console.log(+"3456");

  useEffect(() => {
    if (cookie.get("auth-token") == undefined) {
      setUser(null);
    } else {
      setUser(cookie.get("auth-token"));
    }
    console.log(user, "app user");
  }, [user]);

  return (
    <div>
      <Header user={prof} />
      <Katalog />
      <RouteProvider />
      <Footer />
    </div>
  );
};

export default App;
