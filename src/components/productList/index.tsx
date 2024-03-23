"use client";
import { useProduct } from "@/provider/productProvider";
import CardProduct from "./cardProduct";
import { SetStateAction } from "react";

const ProductList = () => {
  const { products, selectedProducts } = useProduct();
  return (
    <section className="text-black mt-4">
      <h1 className="text-base font-bold">Produtos</h1>
      <span className="text-xs">
        Selecione um produto para adicionar ao seu pedido
      </span>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {selectedProducts === undefined || selectedProducts?.length === 0
          ? products?.map((product) => (
              <CardProduct key={product.id} product={product} />
            ))
          : selectedProducts?.map((product) => (
              <CardProduct key={product.id} product={product} />
            ))}
      </ul>
    </section>
  );
};

export default ProductList;
