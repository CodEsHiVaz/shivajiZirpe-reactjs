import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex flex-row h-28 justify-center bg-sky-400 text-gray-50 gap-10">
      <li className=" flex list-none justify-center items-center">
        <Link to="/">All Products</Link>
      </li>
      <li className=" flex list-none justify-center items-center">
        <Link to="/favorites">Favorite Products </Link>
      </li>
    </div>
  );
};

export default Navbar;
