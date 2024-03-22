"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/service/api";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ProductContextValues, TProduct } from "./interface";

export const ProductContext = createContext({} as ProductContextValues);

export const useProduct = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<TProduct[] | undefined>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const getProducts = async () => {
    const { data } = await api.get<TProduct[]>("/products");
    setProducts(data);
  };
  useEffect(() => {
    (async () => {
      await getProducts();
    })();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        isLoading,
        getProducts,
      }}
    >
      {" "}
      {children}{" "}
    </ProductContext.Provider>
  );
};
