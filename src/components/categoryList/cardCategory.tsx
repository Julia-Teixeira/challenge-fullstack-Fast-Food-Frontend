"use client";
import { useProduct } from "@/provider/productProvider";
import Image from "next/image";

const CardCategory = ({ category }: { category: any }) => {
  const { selectedCategory, setSelectedCategory, getProductsParams } =
    useProduct();

  const handleClick = async () => {
    await getProductsParams(category.name, undefined);
    setSelectedCategory(category.name);
  };
  return (
    <li
      onClick={() => handleClick()}
      className={`flex gap-4 flex-col items-center max-w-48 w-full h-36 rounded-xl
      ]shadow hover:shadow-inner cursor-pointer ${
        selectedCategory === category.name ? "border-2" : "bg-white"
      }`}
    >
      <div className="h-16 w-36 md:w-48 flex flex-col items-center mt-4 gap-2">
        <Image
          src={category.imgCover}
          alt={category.name}
          width={80}
          height={80}
          className="w-[80px] h-[80px]"
        />
      </div>
      <span className="font-bold text-black">{category.name}</span>
    </li>
  );
};

export default CardCategory;
