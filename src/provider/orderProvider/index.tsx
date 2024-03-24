"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/service/api";
import { AxiosError } from "axios";
import { OrderContextValues, TCreateOrder, TOrder } from "./interface";
import { useProduct } from "../productProvider";
import { useRouter } from "next/navigation";
import { print, getPrinters } from "pdf-to-printer";
import { jsPDF } from "jspdf";

export const OrderContext = createContext({} as OrderContextValues);

export const useOrder = () => {
  return useContext(OrderContext);
};

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [countOrder, setCountOrder] = useState(0);
  const { setProductOrder, products } = useProduct();
  const [orders, setOrders] = useState<TOrder[] | undefined>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const route = useRouter();

  const getCountOrder = async () => {
    const { data } = await api.get("/orders");
    setCountOrder(data.length);
  };

  const getAllOrders = async () => {
    const { data } = await api.get<TOrder[]>("/orders");
    setOrders(data);
  };

  const getOrderById = async (id: number) => {
    const { data } = await api.get<TOrder>(`/orders/${id}`);
    return data;
  };

  const printOrder = async (dataId: number) => {
    // const options = {
    //   printer: "Epson Stylus C45",
    //   scale: "fit",
    // };("assets/sample.pdf").then(console.log);

    const order = await getOrderById(dataId);

    const doc = new jsPDF({
      orientation: "landscape",
    });

    doc.text("Obrigado pela preferência!", 10, 10);
    doc.text(`Code - ${order?.code}`, 10, 20);
    doc.text(`Nome - ${order?.nameCostumer}`, 10, 30);

    doc.text("Items:", 10, 40);
    let y = 40;

    order?.productOrder!.map((item: any, index) => {
      doc.text(
        `${index + 1} - ${item.product.name} ------- ${item.amount} - R$${(
          Number(
            products?.find((product) => product.id === item.product.id)!.price
          ) * item.amount
        ).toFixed(2)}`,
        10,
        (y += 10)
      );

      if (item.additionalIds.length > 0) {
        doc.text("Adicionais:", 20, (y += 10));
        item.additionalIds?.map((additional: any) => {
          doc.text(
            `- ${additional.name} ------- R$${Number(additional.price).toFixed(
              2
            )}`,
            30,
            (y += 10)
          );
        });
      }

      if (item.note) {
        doc.text(`Observacao:`, 20, (y += 10));
        doc.text(`${item.note}`, 30, (y += 10));
      }
    });

    doc.text(`Total - R$${Number(order?.total).toFixed(2)}`, 10, (y += 10));
    doc.text(`Pagamento:`, 10, (y += 10));
    doc.text(
      `Tipo: ${
        order.payment[0].type === "inCash"
          ? "Dinheiro"
          : order.payment[0].type === "credit"
          ? "Cartão de Credito"
          : "Cartão de Debito"
      } `,
      20,
      (y += 10)
    );
    doc.text(
      `Total: R$${Number(order.payment[0].total).toFixed(2)} `,
      20,
      (y += 10)
    );
    doc.text(
      `Troco: R$${Number(order.payment[0].change).toFixed(2)} `,
      20,
      (y += 10)
    );

    doc.save(`order_${order?.code}.pdf`);
  };

  const createOrder = async (formData: TCreateOrder) => {
    const { data } = await api.post("/orders", formData);
    await getAllOrders();
    setProductOrder([]);
    await printOrder(data.id);
    setIsOpenModal(true);
  };

  const deleteOrder = async (id: number) => {
    await api
      .delete(`/orders/${id}`)
      .then(async () => {
        await getAllOrders();
      })
      .catch((error: AxiosError) => {
        console.error(error);
      });
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
        printOrder,
        deleteOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
