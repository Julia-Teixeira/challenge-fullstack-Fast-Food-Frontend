"use client";
import { useProduct } from "@/provider/productProvider";
import CardProduct from "./cardProduct";

const ProductList = () => {
  const { products } = useProduct();
  return (
    <section className="text-black mt-4">
      <h1 className="text-base font-bold">Produtos</h1>
      <span className="text-xs">
        Selecione um produto para adicionar ao seu pedido
      </span>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {products?.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))}
      </ul>
      <div className="w-full flex gap-8 justify-end mt-4">
        <button
          type="button"
          className="w-64 border-2 outline-none rounded-2xl py-2 text-[#9F9F9F] font-semibold"
        >
          Cancelar
        </button>
        <button
          type="button"
          className="w-64 border-2 outline-none rounded-2xl py-2 bg-[#9F9F9F] text-white font-semibold"
        >
          Finalizar Pedido
        </button>
      </div>
    </section>
  );
};

export default ProductList;
