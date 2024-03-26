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
      <div
        className={`flex  gap-4 font-semibold text-sm  items-center bg-[#125C13] top-[50px] right-[-5px] p-2 rounded`}
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
