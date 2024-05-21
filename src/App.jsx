import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import "./index.css";
import RouteProvider from "./components/common/RouteProvider";
import Katalog from "./components/Katalog";
import Footer from "./components/Footer";
import Cookies from "universal-cookie";
import { useSelector } from "react-redux";
import CaptionCarousel from "./components/slider/Slider";
const App = () => {
  const [user, setUser] = useState(null);
  
  const prof = useSelector((state) => state.user);
  let cookie = new Cookies();
  cookie.get("auth-token", prof)
  // cookie.get("auith-token", prof)
  console.log(prof);

  // console.log(+"3456");

  useEffect(() => {
    if (cookie.get("auth-token") === undefined) {
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
