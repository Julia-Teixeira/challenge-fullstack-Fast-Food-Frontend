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

  const getAllOrders = async () => {
    const { data } = await api.get<TOrder[]>("/orders");
    setOrders(data);
  };

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    route.push("/");
  };

  const changeStatusOrder = async (id: number, status: string) => {
    await api
      .patch(`/orders/${id}`, { status })
      .then(async () => {
        await getAllOrders();
      })
      .catch((error: AxiosError) => {
        console.error(error);
      });
  };

  useEffect(() => {
    (async () => {
      await getCountOrder();
      await getAllOrders();
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
        changeStatusOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
