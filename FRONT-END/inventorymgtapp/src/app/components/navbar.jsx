// src/Navbar.js
import React from 'react';
// import { FaSearch, FaShoppingCart, FaCog } from 'react-icons/fa';
import logo from "../../../assets/images/pyle.webp" // Ensure you have a logo image in the src directory
import Image from 'next/image';

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="flex items-center space-x-4">
      <a
              id="WindUI"
              aria-label="WindUI logo"
              aria-current="page"
              className="flex items-center gap-2 whitespace-nowrap py-3 text-lg focus:outline-none lg:flex-1"
              href="javascript:void(0)"
            >
             <Image src={logo} height={100} width={100}/>
            </a>
        <div className="relative">
          <input
            type="text"
            placeholder="Search Your Product"
            className="px-4 py-2 border rounded-full w-80"
          />
          {/* <FaSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-purple-500" /> */}
        </div>
      </div>
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-1">
          <span>Shop</span>
          {/* <FaCaretDown /> */}
        </div>
        <span>Offer</span>
        <span>FAQ</span>
        <span>Contact</span>
        {/* <div className="relative">
          <FaShoppingCart className="text-xl" />
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs text-white bg-purple-500 rounded-full">2</span>
        </div> */}
        <div className="flex items-center space-x-2">
          <img
            src="https://via.placeholder.com/40" // Placeholder image for user
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col">
            <span className="font-bold">Andrew Smith</span>
            <span className="text-sm">User</span>
          </div>
        </div>
        {/* <FaCog className="text-xl text-purple-500" /> */}
      </div>
    </div>
  );
};

export default Navbar;
