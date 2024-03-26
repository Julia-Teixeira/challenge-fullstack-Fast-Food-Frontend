"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ItemNavList = ({
  name,
  pathName,
}: {
  name: string;
  pathName: string;
}) => {
  const path = usePathname();

  return (
    <div
      className={`cursor-pointer ${
        path === pathName && "py-2 px-3 rounded-lg bg-black/30"
      } `}
    >
      {name}
    </div>
  );
};

export default ItemNavList;
