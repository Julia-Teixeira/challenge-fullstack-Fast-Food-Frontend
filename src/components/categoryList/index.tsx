"use client";
import api from "@/service/api";
import { useEffect, useState } from "react";
import CardCategory from "./cardCategory";
import { useProduct } from "@/provider/productProvider";
import { TCategoryList } from "@/provider/productProvider/interface";

const CategoryList = () => {
  const { categories } = useProduct();

  return (
    <section>
      <h1 className="text-base font-bold text-black mt-2">Categorias</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {categories?.map((category: TCategoryList) => (
          <CardCategory key={category.id} category={category} />
        ))}
      </ul>
    </section>
  );
};

export default CategoryList;