"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/service/api";
import { AxiosError } from "axios";
import { OrderContextValues, TCreateOrder, TOrder } from "./interface";
import { useProduct } from "../productProvider";
import { useRouter } from "next/navigation";

export const OrderContext = createContext({} as OrderContextValues);

export const useOrder = () => {
  return useContext(OrderContext);
};

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [countOrder, setCountOrder] = useState(0);
  const { setProductOrder } = useProduct();
  const [orders, setOrders] = useState<TOrder[] | undefined>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const route = useRouter();

  const getCountOrder = async () => {
    const { data } = await api.get("/orders");
    setCountOrder(data.length);
  };

  const createOrder = async (formData: TCreateOrder) => {
    const { data } = await api.post("/orders", formData);
    setOrders([...orders!, data]);
    setProductOrder([]);
    setIsOpenModal(true);
  };

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    route.push("/");
  };

  useEffect(() => {
    (async () => {
      await getCountOrder();
    })();
  }, [orders]);

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        countOrder,
        isOpenModal,
        openModal,
        closeModal,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
