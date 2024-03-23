"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/service/api";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import {
  ProductContextValues,
  TAdditionalList,
  TCategoryList,
  TProduct,
  TProductOrder,
  TProductOrderFormData,
} from "./interface";

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
  const [categories, setCategories] = useState<TCategoryList[] | undefined>([]);
  const [additionalProducts, setAdditionalProducts] = useState<
    TAdditionalList[] | undefined
  >([]);
  const [selectedProducts, setSelectedProducts] = useState<
    TProduct[] | undefined
  >([]);
  const [search, setSearch] = useState<TProduct[] | undefined>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectdProduct, setSelectedProduct] = useState<TProduct | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [productOrder, setProductOrder] = useState<TProductOrder[] | undefined>(
    []
  );
  const router = useRouter();

  const getProducts = async () => {
    const { data } = await api.get<TProduct[]>("/products");
    setProducts(data);
  };

  const getAllCategories = async () => {
    const { data } = await api.get<TCategoryList[]>("/categories");
    setCategories(data);
  };

  const getAllAdditionalProducts = async () => {
    const { data } = await api.get<TAdditionalList[]>("/products/additional");
    setAdditionalProducts(data);
  };

  const createProductOrder = async (formData: TProductOrderFormData) => {
    const { data } = await api.post<TProductOrder>("/productOrders", formData);

    setProductOrder([...productOrder!, data]);
  };

  const deleteProductOrder = async (id: number) => {
    await api
      .delete(`/productOrders/${id}`)

      .catch((error: AxiosError) => {
        console.error(error);
      });
  };

  useEffect(() => {
    (async () => {
      await getAllCategories();
      await getProducts();
      await getAllAdditionalProducts();
    })();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        isLoading,
        getProducts,
        categories,
        getAllCategories,
        setSelectedProducts,
        selectedProducts,
        search,
        setSearch,
        isOpenModal,
        setIsOpenModal,
        selectdProduct,
        setSelectedProduct,
        additionalProducts,
        createProductOrder,
        productOrder,
        setProductOrder,
        deleteProductOrder,
      }}
    >
      {" "}
      {children}{" "}
    </ProductContext.Provider>
  );
};
