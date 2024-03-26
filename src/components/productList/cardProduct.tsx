"use client";
import { useProduct } from "@/provider/productProvider";
import { TProduct } from "@/provider/productProvider/interface";
import Image from "next/image";
import pattern from "../../../public/pattern.svg";

const CardProduct = ({ product }: { product: TProduct }) => {
  const { setIsOpenModal, setSelectedProduct } = useProduct();

  const handleClick = () => {
    setSelectedProduct(product);
    setIsOpenModal(true);
  };
  return (
    <li
      onClick={() => handleClick()}
      className="flex pattern-backgound gap-4 flex-col items-center bg-red-100 max-w-48 w-full h-56 rounded-xl shadow-md hover:shadow-inner cursor-pointer"
    >
      <div className="relative h-16 w-36 md:w-48">
        <Image
          src={product.imgCover}
          alt={product.name}
          width={100}
          height={100}
          className="absolute bottom-[-40px] right-[20px] md:right-[40px] w-[100px] h-[100px]"
        />
      </div>
      <div className="flex flex-col items-center bg-white w-full h-36 rounded-s-xl rounded-r-xl pt-6 ">
        <span className="font-bold">{product.name}</span>
        <span className="text-xs">{product.description?.split(`,`)[0]}</span>
        <span className="font-bold my-4">
          {Number(product.price).toLocaleString(`pt-BR`, {
            style: `currency`,
            currency: `BRL`,
          })}
        </span>
      </div>
    </li>
  );
};

export default CardProduct;
