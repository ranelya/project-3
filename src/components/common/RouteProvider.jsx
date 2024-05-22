import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import Cabinet from "../pages/Cabinet";
import AboutUs from "../pages/AboutUs";
import Contacts from "../pages/Contacts";
import Combo from "../pagesKatalog/Combo";
import Pizza from "../pagesKatalog/Pizza";
import Snacks from "../pagesKatalog/Snacks";
import Dessert from "../pagesKatalog/Dessert";
import Beverages from "../pagesKatalog/Beverages";
import OtherGoods from "../pagesKatalog/OtherGoods";
import Stock from "../pagesKatalog/Stock";
import Admin from "../pages/Admin";
import Buy from "../pages/Buy";
import BuyCard from "../pages/BuyCard";
import AdminBev from "../pages/AdminBev";
import AdminComb from "../pages/AdminComb";
import Home from "../pages/Home";
import NotFoundPage from "../pages/NotFoundPage";
  

const RouteProvider = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/" element={<Home/>}/>
      <Route path="/cabinet" element={<Cabinet />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/" element={<Pizza />} />
      <Route path="/combo" element={<Combo />} />
      <Route path="/snacks" element={<Snacks />} />
      <Route path="/dessert" element={<Dessert/>} />
      <Route path="beverages" element={<Beverages/>} />
      <Route path="/othergoods" element={<OtherGoods />} />
      <Route path="/stock" element={<Stock />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/buy" element={<Buy />} />
      <Route path="/buycard" element={<BuyCard />} />
      <Route path="/adminbev" element={<AdminBev />} />
      <Route path="/admincombo" element={<AdminComb />} />
      <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
  );
};

export default RouteProvider;
