"use client";
import { useProduct } from "@/provider/productProvider";
import CardProduct from "./cardProduct";
import { useEffect } from "react";

const ProductList = () => {
  const { products, selectedProducts, getProducts, isLoadingProducts } =
    useProduct();
  useEffect(() => {
    (async () => {
      await getProducts();
    })();
  }, []);
  return (
    <section className="text-black mt-4">
      <h1 className="text-base font-bold">Produtos</h1>
      <span className="text-xs">
        Selecione um produto para adicionar ao seu pedido
      </span>
      {isLoadingProducts ? (
        <div className="flex gap-2 justify-center h-[300px] items-center">
          <p className="w-8 h-8 border-t-4 border-green-500 rounded-full animate-spin" />
          Carregando produtos...
        </div>
      ) : (
        <ul className="grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-center mt-4">
          {selectedProducts === undefined || selectedProducts?.length === 0
            ? products?.map((product) => (
                <CardProduct key={product.id} product={product} />
              ))
            : selectedProducts?.map((product) => (
                <CardProduct key={product.id} product={product} />
              ))}
        </ul>
      )}
    </section>
  );
};

export default ProductList;
