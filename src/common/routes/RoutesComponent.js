import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import ProductDetail from "../components/ProductDetail/ProductDetail";
import Cart from "./Cart";
import Faq from "../components/FAQ/Faq";
import Contacts from "../components/Contacts/Contacts";
import Products from "../components/Products/Products";

const RoutesComponent = ({ cartItems, setCartItems }) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route
        path="/product/:id"
        element={
          <ProductDetail cartItems={cartItems} setCartItems={setCartItems} />
        }
      />
      <Route
        path="/cart"
        element={<Cart cartItems={cartItems} setCartItems={setCartItems} />}
      />
      <Route path="/faq" element={<Faq />} />
      <Route path="/contacts" element={<Contacts />} />
    </Routes>
  );
};

export default RoutesComponent;
