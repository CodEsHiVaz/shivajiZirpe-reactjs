import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteProduct,
  getProduct,
  addTofavrites,
  toggleCategory,
  getCategory,
  showForm,
} from "../../Redux/features/ProductSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import { CategotyObj, ProductObj } from "./types/types";

const Products = () => {
  const dispatch = useAppDispatch();
  const productList = useAppSelector((state) => state.product.productList);
  const categories = useAppSelector((state) => state.product.categories);
  const abc = () => {
    dispatch(showForm(true));
  };
  const navigate = useNavigate();
  const productInfoNavigator = (id: string) => {
    navigate(`/productDetails/${id}`);
  };
  useEffect(() => {
    dispatch(getProduct());
    dispatch(getCategory());
  }, [dispatch]);

  return (
    <>
      <div className="flex justify-end flex-row text-right  py-5 pr-11 gap-8">
        <button className="button-88" onClick={abc}>
          Add New Product
        </button>
        <form>
          <label htmlFor="selectCategory"> Filter By : </label>
          <select
            className=" border border-gray-900  rounded-md p-2"
            name="category"
            id="selectCategory"
            defaultValue={""}
            onChange={(event) => dispatch(toggleCategory(event.target.value))}
          >
            <option value="all">All Products</option>

            {categories &&
              categories.map((elem: CategotyObj) => {
                return (
                  <option key={elem._id} value={elem.name}>
                    {elem.name}
                  </option>
                );
              })}
          </select>
        </form>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 px-40    gap-10 ">
        {productList &&
          productList.map((elem: ProductObj) => {
            return (
              <div
                key={elem._id}
                className="flex flex-col hover:shadow-2xl shadow-lg rounded-md"
              >
                <div
                  className="flex justify-center h-3/4"
                  onClick={() => productInfoNavigator(elem._id)}
                >
                  <img src={elem.avatar} className="w-full" alt="img" />
                </div>
                <div className="font-bold pl-6">
                  <p className=" text-2xl ">{elem.name}</p>
                  <p> Price :- ${elem.price}</p>
                  <p> Category :- {elem.category}</p>
                </div>
                <div className="w-full flex lg:flex-row md:flex-col sm:flex-col justify-center gap-3 p-4">
                  <button
                    onClick={() => dispatch(addTofavrites(elem))}
                    className="hover:shadow-lg bg-pink-500  px-1 w-full rounded-lg h-9 flex justify-center items-center shadow-indigo-500/40 ..."
                  >
                    <span className="material-symbols-outlined">
                      heart_plus
                    </span>
                  </button>
                  <button
                    onClick={() => dispatch(deleteProduct(elem._id))}
                    className="hover:shadow-lg bg-red-600 text-zinc-50 px-1 w-full rounded-lg h-9 flex justify-center items-center shadow-indigo-500/40 ..."
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Products;
