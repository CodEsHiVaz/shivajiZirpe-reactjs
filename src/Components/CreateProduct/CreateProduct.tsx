import React, { useEffect, useState } from "react";
import {
  addProduct,
  getCategory,
  showForm,
} from "../../Redux/features/ProductSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import { CategotyObj, FormData } from "../Products/types/types";

const CreateProduct = () => {
  const categories = useAppSelector((state) => state.product.categories);
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<FormData | null>(null);

  const handelSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(addProduct(formData));
    dispatch(showForm(false));
  };

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  return (
    <div className="flex justify-center items-center content-center">
      <form
        onSubmit={(event) => handelSubmit(event)}
        className="flex flex-col gap-10 p-10 border border-zinc-900 w-2/4 relative rounded-lg top-36 shadow-2xl"
      >
        <div className="flex lg:flex-row sm:flex-col justify-center items-center gap-10">
          <p className="font-bold text-2xl bg-green-500 px-2 py-1 border rounded-tl-2xl rounded-br-2xl">
            New Product Form
          </p>
        </div>
        <div className="flex lg:flex-row sm:flex-col justify-between items-center gap-10">
          <input
            className="border-2  border-sky-400 h-10 rounded-md pl-2 w-full"
            type="text"
            name="name"
            placeholder="Enter Productname"
            onChange={(event) =>
              setFormData({ ...formData, name: event.target.value })
            }
          />
          <input
            className="border-2 border-sky-400 h-10 rounded-md pl-2 w-full"
            type="number"
            name="price"
            placeholder="Enter price"
            onChange={(event) =>
              setFormData({ ...formData, price: event.target.value })
            }
          />
        </div>
        <div className="flex  lg:flex-row sm:flex-col justify-between items-center gap-10">
          <input
            className="border-2 border-sky-400 h-10 rounded-md pl-2 w-full"
            type="text"
            name="avatar"
            id=""
            placeholder="Add a avatar url link here..."
            onChange={(event) =>
              setFormData({ ...formData, avatar: event.target.value })
            }
          />

          <input
            className="border-2 border-sky-400 h-10 rounded-md pl-2 w-full"
            type="email"
            placeholder="Enter Email id"
            name="developerEmail"
            id=""
            onChange={(event) =>
              setFormData({ ...formData, developerEmail: event.target.value })
            }
          />
        </div>

        <div className="flex  lg:flex-row sm:flex-col justify-between items-center gap-10">
          <select
            className="border-2 border-sky-400 h-10 rounded-md pl-2 w-full"
            name="category"
            id=""
            defaultValue={""}
            onChange={(event) =>
              setFormData({ ...formData, category: event.target.value })
            }
          >
            <option value="">Select category</option>
            {categories &&
              categories.map((elem: CategotyObj) => {
                return (
                  <option key={elem._id} value={elem.name}>
                    {elem.name}
                  </option>
                );
              })}
          </select>

          <textarea
            className="border-2 border-sky-400  rounded-md pl-2 w-full"
            name="description"
            id="description"
            cols={30}
            rows={4}
            placeholder="Enter Product Description ..."
            onChange={(event) =>
              setFormData({ ...formData, description: event.target.value })
            }
          ></textarea>
        </div>
        <div className="flex  lg:flex-row sm:flex-col justify-center items-center gap-10 ">
          <button className="button-34" type={"submit"}>
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
