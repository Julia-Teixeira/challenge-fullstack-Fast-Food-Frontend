"use client";

import { useProduct } from "@/provider/productProvider";
import { TProduct } from "@/provider/productProvider/interface";
import { useState } from "react";

const Search = () => {
  const { setSelectedProducts, products, selectedProducts } = useProduct();
  const [search, setSearch] = useState<string>("");
  const handleSearch = (search: string) => {
    const filter: TProduct[] | undefined = products?.filter(
      (product: TProduct) =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    setSelectedProducts(filter);
  };
  const clearFilter = () => {
    setSearch("");
    setSelectedProducts(undefined);
  };
  return (
    <>
      <input
        onChange={(e) => handleSearch(e.target.value)}
        value={search}
        title="Pesquisar"
        placeholder="O que você procura?"
        className="bg-[#F4F4F4] p-3 rounded w-64 sm:w-96 outline-none text-black text-sm mt-4"
      />
      {selectedProducts !== undefined && selectedProducts?.length > 0 ? (
        <span
          className="text-xs underline text-black cursor-pointer mt-1"
          onClick={() => clearFilter()}
        >
          Limpar filtro
        </span>
      ) : null}
    </>
  );
};

export default Search;
