import { useState } from "react";

import { Link } from "react-router";

import { useTheme } from "../hooks/useTheme";
import NavLinks from "./NavLinks";

import { IoMoonOutline, IoSunnyOutline, IoMenu, IoClose } from "react-icons/io5";

const Nav = () => {
  const { darkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-20 bg-gray-50 dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700">
        <div className="mx-auto px-4 py-6">
          <div className="w-full mx-auto flex items-center justify-between">
            <Link className="flex items-center gap-1" to={"/"}>
              <div className="h-6 w-6 sm:w-7 sm:h-7 bg-blue-500 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-lg">M</span>
              </div>
              <span className="font-bold text-lg sm:text-2xl dark:text-white">MovieFinder</span>
            </Link>

            <nav className="hidden md:flex items-center gap-3">
              <NavLinks />
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="flex items-center p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-200 dark:bg-gray-800 hover:cursor-pointer hover:opacity-85 transition-all duration-200"
              >
                {darkMode ? (
                  <IoSunnyOutline className="w-5 h-5 text-white" />
                ) : (
                  <IoMoonOutline className="w-5 h-5" />
                )}
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden flex items-center p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-200 dark:bg-gray-800 hover:cursor-pointer hover:opacity-85 transition-all duration-200"
              >
                {isMenuOpen ? (
                  <IoClose className="w-5 h-5 dark:text-white" />
                ) : (
                  <IoMenu className="w-5 h-5 dark:text-white" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <nav
            className={`md:hidden flex flex-col gap-2 ${
              isMenuOpen ? "mt-4" : ""
            } transition-all duration-300 overflow-hidden ${
              isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <NavLinks />
          </nav>
        </div>
      </header>
    </>
  );
};

export default Nav;
