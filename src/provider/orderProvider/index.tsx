"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/service/api";
import { AxiosError } from "axios";
import {
  OrderContextValues,
  TCreateOrder,
  TOrder,
  TOrderPagination,
} from "./interface";
import { useProduct } from "../productProvider";
import { useRouter } from "next/navigation";
const qz = require("qz-tray");
import Error from "next/error";

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
    await api
      .get("/orders")
      .then(({ data }) => {
        setCountOrder(data.data.length);
      })
      .catch((error) => console.error(error));
  };

  const getAllOrders = async () => {
    await api
      .get<TOrderPagination>("/orders")
      .then(({ data }) => {
        setOrders(data.data);
      })
      .catch((error) => console.error(error));
  };

  const getOrderById = async (id: number) => {
    await api
      .get<TOrder>(`/orders/${id}`)
      .then(({ data }) => {
        return data;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // const printOrder = async (dataId: number) => {
  //   const order = await getOrderById(dataId);

  //   console.log(order);

  //   const doc = new jsPDF({
  //     orientation: "portrait",
  //     unit: "mm",
  //     format: [80, 150],
  //   });

  //   doc.setFontSize(12);
  //   doc.text("Obrigado pela preferência!", 10, 10);
  //   doc.text(`Code - ${order?.code}`, 10, 20);
  //   doc.text(`Nome - ${order?.nameCostumer}`, 10, 30);

  //   doc.text("Items:", 10, 40);
  //   let y = 40;

  //   order?.productOrder!.map((item: any, index) => {
  //     doc.text(
  //       `${index + 1} - ${item.product.name} --- ${item.amount} - R$${(
  //         Number(
  //           products?.find((product) => product.id === item.product.id)!.price
  //         ) * item.amount
  //       ).toFixed(2)}`,
  //       10,
  //       (y += 10)
  //     );

  //     if (item.additionalIds.length > 0) {
  //       doc.text("Adicionais:", 20, (y += 10));
  //       item.additionalIds?.map((additional: any) => {
  //         doc.text(
  //           `- ${additional.name} --- R$${Number(additional.price).toFixed(2)}`,
  //           30,
  //           (y += 10)
  //         );
  //       });
  //     }

  //     if (item.note) {
  //       doc.text(`Observacao:`, 20, (y += 10));
  //       doc.text(`${item.note}`, 30, (y += 10));
  //     }
  //   });

  //   doc.text(`Total - R$${Number(order?.total).toFixed(2)}`, 10, (y += 10));
  //   doc.text(`Pagamento:`, 10, (y += 10));
  //   doc.text(
  //     `Tipo: ${
  //       order.payment[0].type === "inCash"
  //         ? "Dinheiro"
  //         : order.payment[0].type === "credit"
  //         ? "Cartão de Credito"
  //         : "Cartão de Debito"
  //     } `,
  //     20,
  //     (y += 10)
  //   );
  //   doc.text(
  //     `Total: R$${Number(order.payment[0].total).toFixed(2)} `,
  //     20,
  //     (y += 10)
  //   );
  //   doc.text(
  //     `Troco: R$${Number(order.payment[0].change).toFixed(2)} `,
  //     20,
  //     (y += 10)
  //   );
  //   doc.save(`order_${order?.code}.pdf`);
  // };

  const printReceipt = async (nameCostumer: string, code: number) => {
    // esse funcionou
    qz.websocket
      .connect()
      .then(() => {
        return qz.printers.find();
      })
      .then((printers: any) => {
        let config = qz.configs.create("Zebra", {
          size: { width: 4, height: 6 },
        });
        return qz.print(config, [
          "^XA\n",
          "^FS\n",
          "^FX Texto de agradecimento\n",
          "^FO 90,100\n",
          "^A0N,36,46\n",
          "^FD Obrigado pela preferencia\n",
          "^FS\n",
          "^FX Nome do cliente\n",
          "^FO 90,160\n",
          "^A0,36,46\n",
          "^FD Cliente: " + nameCostumer + "\n",
          "^FS\n",
          "^FX Codigo do pedido\n",
          "^FO 90,220\n",
          "^A0,36,46\n",
          "^FD Code: " + code + "\n",
          "^FS\n",
          "^XZ",
        ]);
      })
      .then(() => {
        return qz.websocket.disconnect();
      })
      .catch((err: Error) => {
        console.error(err);
      });
  };

  const createOrder = async (formData: TCreateOrder) => {
    await api
      .post("/orders", formData)
      .then(async ({ data }) => {
        await getAllOrders();
        setProductOrder([]);
        await printReceipt(data.nameCostumer, data.code);
        setIsOpenModal(true);
      })
      .catch((error) => console.error(error));
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

    if (status === "finished") {
      const audio = new Audio("./notification_sound.mp3");
      audio.play();
    }
  };

  useEffect(() => {
    (async () => {
      await getCountOrder();
      await getAllOrders();
    })();
  }, []);

  return (
    <OrderContext.Provider
      value={{
        orders,
        getAllOrders,
        createOrder,
        countOrder,
        isOpenModal,
        openModal,
        closeModal,
        changeStatusOrder,
        deleteOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
