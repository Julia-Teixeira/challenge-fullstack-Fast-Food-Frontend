"use client";
import { useProduct } from "@/provider/productProvider";
import { TProduct } from "@/provider/productProvider/interface";
import Image from "next/image";

const CardCategory = ({ category }: { category: any }) => {
  const { setSelectedProducts, products } = useProduct();

  const handleClick = () => {
    const filter = products?.filter(
      (product: TProduct) => product.categoryId === category.id
    );
    setSelectedProducts(filter);
  };
  return (
    <li
      onClick={() => handleClick()}
      className="flex gap-4 flex-col items-center max-w-48 w-full h-36 rounded-xl shadow hover:shadow-inner"
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
