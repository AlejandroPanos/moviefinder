import { NavLink } from "react-router";

import { IoSearchOutline, IoHeartOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";

const NavLinks = () => {
  const activeCss =
    "flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 dark:bg-blue-700 font-light text-white hover:cursor-pointer hover:opacity-90 transition-all duration-200";

  const inactiveCss =
    "flex items-center gap-2 px-4 py-2 rounded-lg font-light dark:text-white hover:cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200";

  return (
    <>
      <NavLink to={"/"} className={({ isActive }) => (isActive ? activeCss : inactiveCss)}>
        <GoHome className="w-5 h-5" />
        <span>Home</span>
      </NavLink>
      <NavLink to={"search"} className={({ isActive }) => (isActive ? activeCss : inactiveCss)}>
        <IoSearchOutline className="w-5 h-5" />
        <span>Search</span>
      </NavLink>
      <NavLink to={"favorites"} className={({ isActive }) => (isActive ? activeCss : inactiveCss)}>
        <IoHeartOutline className="w-5 h-5" />
        <span>Favorites</span>
      </NavLink>
    </>
  );
};

export default NavLinks;
