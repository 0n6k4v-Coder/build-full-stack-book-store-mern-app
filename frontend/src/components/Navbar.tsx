import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  HiMiniBars3CenterLeft, 
  HiOutlineHeart, 
  HiOutlineShoppingCart,
  HiOutlineXMark,
  HiBars3
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const currentUser = true;

  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-4 sm:py-6">
      <nav className="flex flex-wrap justify-between items-center gap-y-3 gap-x-2 sm:gap-4 md:gap-8 lg:gap-16">
        {/* Left Side: Mobile Menu Toggle + Logo & Search */}
        <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
          {/* Hamburger for mobile nav (separate from user dropdown) */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="md:hidden cursor-pointer focus:outline-none shrink-0"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? (
              <HiOutlineXMark className="size-6" />
            ) : (
              <HiBars3 className="size-6" />
            )}
          </button>

          <Link to="/" aria-label="Home" className="shrink-0 hidden md:block">
            <HiMiniBars3CenterLeft className="size-6 cursor-pointer" />
          </Link>

          {/* Search Input - now fluid instead of fixed w-40/w-72 */}
          <div className="relative flex-1 min-w-[7rem] max-w-xs sm:max-w-sm">
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search here"
              className="bg-[#EAEAEA] w-full py-1.5 pl-9 pr-3 rounded-md focus:outline-none text-sm"
            />
          </div>
        </div>

        {/* Right Side: User Menu, Favorites & Cart */}
        <div className="relative flex items-center gap-2 sm:gap-3 shrink-0">
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
                    className="size-7 rounded-full ring-2 ring-blue-500"
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 sm:w-48 bg-white shadow-lg rounded-md z-40">
                    <ul className="py-2">
                      {navigation.map((item) => (
                        <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
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
            className="bg-primary px-2.5 sm:px-4 md:px-6 py-2 flex items-center rounded-sm hover:opacity-90 transition-opacity"
          >
            <HiOutlineShoppingCart className="size-5" />
            <span className="text-sm font-semibold ml-1">0</span>
          </Link>
        </div>

        {/* Mobile Nav Drawer - always accessible regardless of login state */}
        {isMobileMenuOpen && (
          <div className="w-full md:hidden order-3">
            <ul className="flex flex-col border-t mt-2 pt-2">
              {navigation.map((item) => (
                <li key={item.name} onClick={() => setIsMobileMenuOpen(false)}>
                  <Link
                    to={item.href}
                    className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;