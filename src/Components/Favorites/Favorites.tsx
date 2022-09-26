import React from "react";
import { removeFromFavrites } from "../../Redux/features/ProductSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import { ProductObj } from "../Products/types/types";

const Favorites = () => {
  const favProduct = useAppSelector((state) => state.product.favProduct);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 px-40 border pt-20 border-slate-900 gap-10">
        {favProduct &&
          favProduct.map((elem: ProductObj) => {
            return (
              <div
                key={elem._id}
                className="flex flex-col hover:shadow-2xl shadow-lg rounded-md"
              >
                <div className="flex justify-center border-zinc-900 h-3/4">
                  <img src={elem.avatar} className="w-full" alt="" />
                </div>
                <div className="font-bold pl-6">
                  <p className=" text-2xl ">{elem.name}</p>
                  <p> Price :- ${elem.price}</p>
                  <p> Category :- {elem.category}</p>
                </div>
                <div className="w-full flex lg:flex-row md:flex-col sm:flex-col justify-center gap-3 p-4">
                  <button
                    onClick={() => dispatch(removeFromFavrites(elem._id))}
                    className="shadow-lg bg-red-500  px-1 w-full rounded-lg h-9 flex justify-center items-center shadow-indigo-500/40 ..."
                  >
                    <span className="material-symbols-outlined">
                      heart_minus
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Favorites;
