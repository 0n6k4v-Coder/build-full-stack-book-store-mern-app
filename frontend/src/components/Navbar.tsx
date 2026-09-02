import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  HiMiniBars3CenterLeft, 
  HiOutlineHeart, 
  HiOutlineShoppingCart 
} from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";

import avatarImg from "../assets/avatar.png";

interface NavItem {
  name: string;
  href: string;
}

const navigation: NavItem[] = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Orders", href: "/order" },
  { name: "Cart Page", href: "/cart" },
  { name: "Check Out", href: "/checkout" },
];

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const currentUser = true;

  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-6">
      <nav className="flex justify-between items-center">
        {/* Left Side: Logo & Search */}
        <div className="flex items-center md:gap-16 gap-4">
          <Link to="/" aria-label="Home">
            <HiMiniBars3CenterLeft className="size-6 cursor-pointer" />
          </Link>

          {/* Search Input */}
          <div className="relative sm:w-72 w-40 space-x-2">
            <IoSearchOutline className="absolute inline-block left-3 inset-y-2 text-gray-500" />
            <input
              type="text"
              placeholder="Search here"
              className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"
            />
          </div>
        </div>

        {/* Right Side: User Menu, Favorites & Cart */}
        <div className="relative flex items-center md:space-x-3 space-x-2">
          <div>
            {currentUser ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="cursor-pointer focus:outline-none"
                  aria-expanded={isDropdownOpen}
                  aria-label="User Menu"
                >
                  <img
                    src={avatarImg}
                    alt="User Avatar"
                    className={`size-7 rounded-full ${
                      currentUser ? "ring-2 ring-blue-500" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                    <ul className="py-2">
                      {navigation.map((item) => (
                        <li
                          key={item.name}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Link
                            to={item.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login" aria-label="Login">
                <HiOutlineUser className="size-6 text-gray-700 hover:text-blue-500 transition-colors" />
              </Link>
            )}
          </div>

          <button
            type="button"
            className="hidden sm:block cursor-pointer focus:outline-none"
            aria-label="Favorites"
          >
            <HiOutlineHeart className="size-6 text-gray-700 hover:text-red-500 transition-colors" />
          </button>

          <Link
            to="/cart"
            className="bg-primary p-1 sm:px-6 py-2 flex items-center rounded-sm hover:opacity-90 transition-opacity"
          >
            <HiOutlineShoppingCart className="size-5" />
            <span className="text-sm font-semibold sm:ml-1">0</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;