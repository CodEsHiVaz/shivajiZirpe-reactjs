import React, { useEffect } from "react";
import { getCategory } from "../../Redux/features/ProductSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import CreateProduct from "../CreateProduct/CreateProduct";
import Products from "../Products/Products";
const Home = () => {
  const toggleForm = useAppSelector((state) => state.product.toggleForm);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);
  return <div>{toggleForm ? <CreateProduct /> : <Products />}</div>;
};

export default Home;
