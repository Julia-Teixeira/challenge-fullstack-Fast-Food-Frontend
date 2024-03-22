import { TProduct } from "@/provider/productProvider/interface";
import Image from "next/image";
import Link from "next/link";

const CardProduct = ({ product }: { product: TProduct }) => {
  return (
    <Link href={`/`}>
      <li className="flex gap-4 flex-col items-center bg-red-500 max-w-48 w-full h-56 rounded-xl shadow-md">
        <div className="relative h-16 w-full">
          <Image
            src={product.imgCover}
            alt={product.name}
            width={100}
            height={100}
            className="absolute bottom-[-40px] right-[50px] rounded-full"
          />
        </div>
        <div className="flex flex-col items-center bg-white w-full rounded-s-xl rounded-r-xl pt-10 ">
          <span className="font-bold">{product.name}</span>
          <span className="text-xs">{product.description?.split(`,`)[0]}</span>
          <span className="font-bold my-6">
            {Number(product.price).toLocaleString(`pt-BR`, {
              style: `currency`,
              currency: `BRL`,
            })}
          </span>
        </div>
      </li>
    </Link>
  );
};

export default CardProduct;
