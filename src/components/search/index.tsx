"use client";

import { useProduct } from "@/provider/productProvider";
import { useState } from "react";

const Search = () => {
  const {
    setSelectedProducts,
    selectedProducts,
    setSelectedCategory,
    getProductsParams,
  } = useProduct();
  const [search, setSearch] = useState<string>("");
  const handleSearch = async (name: string) => {
    await getProductsParams(undefined, name)
      .then(() => {
        setSelectedCategory("");
      })
      .catch((error) => console.error(error));
  };
  const clearFilter = () => {
    setSearch("");
    setSelectedCategory("");
    setSelectedProducts(undefined);
  };
  return (
    <>
      <input
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={search}
        title="Pesquisar"
        placeholder="O que você procura?"
        className="bg-[#F4F4F4] p-3 rounded w-full max-w-96 outline-none text-black text-sm mt-4"
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
