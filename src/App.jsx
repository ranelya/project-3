import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import "./index.css";
import RouteProvider from "./components/common/RouteProvider";
import Katalog from "./components/Katalog";
import Footer from "./components/Footer";
import Cookies from "universal-cookie";
import { useSelector } from "react-redux";

const App = () => {
  const [user, setUser] = useState(null);
  const prof = useSelector((state) => state.user);
  
  useEffect(() => {
    const cookie = new Cookies();
    const authToken = cookie.get("auth-token");
    if (authToken === undefined) {
      setUser(null);
    } else {
      setUser(authToken);
    }
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
