"use client";

import { FiSearch, FiUser, FiShoppingCart } from "react-icons/fi";

const NAV_LINKS = ["Furniture", "Projects", "Archive", "Studio"];

export default function Header() {
  return (
    <header className="absolute z-90 grid w-full grid-cols-2 items-center gap-4 px-5 pt-6 text-[#f4ede3] sm:px-8 sm:pt-8 md:grid-cols-3 lg:px-12">
      <div className="font-sans text-[0.7rem] font-semibold tracking-[0.25em] sm:text-xs">
        BROWN :: WOOD
      </div>

      <nav className="col-span-2 row-start-2 hidden justify-self-center font-sans text-xs tracking-wide text-[#f4ede3]/90 md:col-span-1 md:row-start-1 md:flex md:gap-8">
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href="#"
            className="transition-colors duration-200 hover:text-white"
          >
            {link}
          </a>
        ))}
      </nav>

      <div className="flex items-center justify-end gap-4 font-sans text-xs sm:gap-6 sm:text-sm">
        <a
          href="#"
          className="hidden items-center gap-1.5 transition-colors duration-200 hover:text-white sm:flex"
        >
          <FiSearch className="text-sm" aria-hidden />
          Search
        </a>
        <a
          href="#"
          className="hidden items-center gap-1.5 transition-colors duration-200 hover:text-white sm:flex"
        >
          <FiUser className="text-sm" aria-hidden />
          Account
        </a>
        <a
          href="#"
          className="flex items-center gap-1.5 transition-colors duration-200 hover:text-white"
        >
          <FiShoppingCart className="text-sm sm:hidden" aria-hidden />
          <span>Cart</span>
        </a>
      </div>

      <nav className="col-span-2 flex gap-5 overflow-x-auto font-sans text-[0.65rem] tracking-wide text-[#f4ede3]/80 md:hidden">
        {NAV_LINKS.map((link, i) => (
          <a key={i} href="#" className="whitespace-nowrap">
            {link}
          </a>
        ))}
      </nav>
    </header>
  );
}