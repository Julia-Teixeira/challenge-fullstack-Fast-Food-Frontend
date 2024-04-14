"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/service/api";
import { AxiosError } from "axios";
import {
  ProductContextValues,
  TAdditionalList,
  TCategoryList,
  TPaginationProduct,
  TProduct,
  TProductOrder,
  TProductOrderFormData,
  TPaginationAdditional,
  TPaginationCategory,
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

  const getProducts = async () => {
    setIsLoading(true);
    await api
      .get<TPaginationProduct>("/products")
      .then(({ data }) => {
        setProducts(data.data);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

  const getAllCategories = async () => {
    setIsLoading(true);
    await api
      .get<TPaginationCategory>("/categories")
      .then(({ data }): void => {
        setCategories(data.data);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

  const getAllAdditionalProducts = async () => {
    await api
      .get<TPaginationAdditional>("/additionals")
      .then(({ data }) => {
        setAdditionalProducts(data.data);
      })
      .catch((error) => console.error(error));
  };

  const createProductOrder = async (formData: TProductOrderFormData) => {
    await api
      .post<TProductOrder>("/productOrders", formData)
      .then(({ data }) => {
        setProductOrder([...productOrder!, data]);
      })
      .catch((error) => console.error(error));
  };

  const deleteProductOrder = async (id: number) => {
    await api
      .delete(`/productOrders/${id}`)
      .then(() => {
        setProductOrder(productOrder?.filter((item) => item.id !== id));
      })
      .catch((error: AxiosError) => {
        console.error(error);
      });
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await getAllCategories();
      await getProducts();
      await getAllAdditionalProducts();
    })();
    setIsLoading(false);
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
      {children}
    </ProductContext.Provider>
  );
};
