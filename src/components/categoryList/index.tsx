"use client";
import api from "@/service/api";
import { useEffect, useState } from "react";
import CardCategory from "./cardCategory";
import { useProduct } from "@/provider/productProvider";
import { TCategoryList } from "@/provider/productProvider/interface";

const CategoryList = () => {
  const { categories, getAllCategories } = useProduct();

  useEffect(() => {
    (async () => {
      await getAllCategories();
    })();
  }, []);

  return (
    <section className=" text-black">
      <h1 className="text-base font-bold text-black mt-2">Categorias</h1>
      <span className="text-xs">Navegue por categoria</span>
      <ul className="flex overflow-x-auto gap-4 mt-4 h-[150px] ">
        {categories?.map((category: TCategoryList) => (
          <CardCategory key={category.id} category={category} />
        ))}
      </ul>
    </section>
  );
};

export default CategoryList;
