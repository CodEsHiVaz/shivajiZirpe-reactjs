import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getIndiProduct } from "../../Redux/features/ProductSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";

const ProductDetails = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const indiviProd = useAppSelector((state) => state.product.indiviProd);
  const product = indiviProd[0];
  useEffect(() => {
    dispatch(getIndiProduct(id));
  }, []);

  return (
    <div className=" m-auto mt-8">
      <p className="font-bold text-2xl text-center mb-10">
        Product Information Page
      </p>
      <div className=" flex  flex-row  border border-gray-900 rounded-md w-2/4 m-auto h-full gap-5 p-5 customBoxShadow2">
        <div className="border border-red-900 w-2/4">
          <img className="w-full " src={product?.avatar} alt="prodImg" />
        </div>
        <div className="border w-2/4 px-5">
          <p className="font-bold text-lg"> Name :- {product?.name}</p>
          <p className="font-bold text-lg"> Price :- ${product?.price}</p>
          <p className="font-bold text-lg"> Category :- {product?.category}</p>
          <p className=" font-bold text-sm">Product Description :- </p>{" "}
          <span className=" text-sm">{product?.description}</span>
          <p className="font-bold text-sm">Developer Email :-</p>
          <span className=" text-sm">{product?.developerEmail}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
