"use client";
import { useEffect } from "react";
import CardCategory from "./cardCategory";
import { useProduct } from "@/provider/productProvider";
import { TCategoryList } from "@/provider/productProvider/interface";

const CategoryList = () => {
  const { categories, getAllCategories, isLoadingCategory } = useProduct();

  useEffect(() => {
    (async () => {
      await getAllCategories();
    })();
  }, []);

  return (
    <section className=" text-black ">
      <h1 className="text-base font-bold text-black mt-2">Categorias</h1>
      <span className="text-xs">Navegue por categoria</span>

      {isLoadingCategory ? (
        <div className="flex gap-2 justify-center h-[100px] items-center">
          <p className="w-8 h-8 border-t-4 border-green-500 rounded-full animate-spin" />
          Carregando categorias...
        </div>
      ) : (
        <ul className="flex overflow-x-auto gap-4 lg:gap-16 mt-4 h-[150px] ">
          {categories?.map((category: TCategoryList) => (
            <CardCategory key={category.id} category={category} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default CategoryList;
