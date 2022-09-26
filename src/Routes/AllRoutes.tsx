import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateProduct from "../Components/CreateProduct/CreateProduct";
import Favorites from "../Components/Favorites/Favorites";
import Home from "../Components/Home/Home";
import ProductDetails from "../Components/ProductDetails/ProductDetails";
const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/favorites" element={<Favorites />}></Route>
        <Route path="/productDetails/:id" element={<ProductDetails />}></Route>
        <Route path="/addProduct" element={<CreateProduct />}></Route>
      </Routes>
    </>
  );
};

export default AllRoutes;
