"use client";
import Link from "next/link";
import ItemNavList from "./itemNavList";
import { useState } from "react";

const NavList = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex  gap-4 font-semibold text-sm  items-center  ">
      <div className="block md:hidden">
        <button
          type="button"
          title="Menu"
          onClick={toggleMenu}
          className="text-white focus:outline-none"
        >
          <svg className="h-8 w-8 fill-current" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M4 6h16a1 1 0 010 2H4a1 1 0 110-2zm0 5h16a1 1 0 010 2H4a1 1 0 010-2zm0 5h16a1 1 0 010 2H4a1 1 0 010-2z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div
        className={`sm:flex  gap-4 font-semibold text-sm  items-center bg-[#125C13] top-[50px] right-[-5px] p-2 rounded ${
          isOpen ? "absolute" : "hidden"
        }`}
      >
        <Link href="/">
          <ItemNavList name="Pedidos" key="productOrder" pathName="/" />
        </Link>
        <Link href="/kitchen">
          <ItemNavList name="Cozinha" key="kitchen" pathName="/kitchen" />
        </Link>
        <Link href="/delivery">
          <ItemNavList name="Retirada" key="delivery" pathName="/delivery" />
        </Link>
      </div>
    </div>
  );
};

export default NavList;
