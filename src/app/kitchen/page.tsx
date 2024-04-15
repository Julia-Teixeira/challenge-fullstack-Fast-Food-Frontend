"use client";
import { useOrder } from "@/provider/orderProvider";
import Image from "next/image";
import { useEffect } from "react";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";

const Kitchen = () => {
  const {
    changeStatusOrder,
    deleteOrder,
    getOrdersByParams,
    orderOnGoing,
    orderFinished,
    isLoading,
  } = useOrder();

  useEffect(() => {
    (async () => {
      await getOrdersByParams("onGoing");
      await getOrdersByParams("finished");
    })();
  }, []);
  return (
    <section className="flex flex-col sm:flex-row gap-8 lg:justify-between text-black h-[600px] mt-8">
      <div>
        <h2 className="font-bold text-lg">Preparando:</h2>
        {isLoading ? (
          <div className="flex gap-2 items-center justify-center h-full">
            <p className="w-4 h-4 border-t-4 border-green-500 rounded-full animate-spin" />
            <p>Carregando pedidos...</p>
          </div>
        ) : (
          <ul className="flex flex-col gap-4 mt-4 overflow-auto h-[200px] w-full lg:h-[400px] lg:w-96">
            {orderOnGoing?.map((order) => (
              <li
                key={order.id}
                className="flex justify-between items-center
            shadow-sm rounded-xl p-3 w-full lg:w-80"
              >
                <div className="flex gap-4">
                  <Image
                    src={order.productOrder[0].product.imgCover}
                    alt={order.nameCostumer}
                    width={50}
                    height={50}
                  />
                  <div>
                    <span className="font-semibold text-sm lg:text-base">
                      {order.code} - {order.nameCostumer}
                    </span>
                    <div className="flex flex-col">
                      {order.productOrder.map((item) => (
                        <span className="text-xs" key={item.id}>
                          {item.amount}X {item.product.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => deleteOrder(order.id)}
                    type="button"
                    title="Remover"
                    className="p-2 rounded-lg bg-red-100"
                  >
                    <IoMdClose color="rgb(185 28 28)" />
                  </button>
                  <button
                    type="button"
                    title="Confirmar"
                    className="bg-green-100 p-2 rounded-lg"
                    onClick={() => changeStatusOrder(order.id, "finished")}
                  >
                    <IoMdCheckmark color="#125C13" size={15} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div>
          <h2 className="font-bold text-sm mt-4">Observações:</h2>
          <label htmlFor="notes">
            <textarea
              id="notes"
              title="notes"
              className="w-72 md:w-80 resize-none outline-none bg-[#F5F5F5] h-28 mt-2 p-2"
              value={
                orderOnGoing?.length === 0
                  ? ""
                  : orderOnGoing![0]?.productOrder
                      .map(
                        (item) =>
                          `${item.product.name} - ${item.note}\n ${
                            item?.additionalIds?.length! > 0
                              ? `- Adicionais:\n ${item.additionalIds
                                  ?.map(
                                    (item) =>
                                      `${item.name} - ${item.description} `
                                  )
                                  .join("\n")} `
                              : ""
                          }
                           `
                      )
                      .join("\n")
                      .toString()
              }
              readOnly
            />
          </label>
        </div>
      </div>

      <div className="w-full h-[1px] sm:h-full sm:w-[1px] bg-black" />

      <div>
        <h2 className="font-bold text-lg">Pronto:</h2>
        {isLoading ? (
          <div className="flex gap-2 items-center justify-center h-full">
            <p className="w-4 h-4 border-t-4 border-green-500 rounded-full animate-spin" />
            <p>Carregando pedidos...</p>
          </div>
        ) : (
          <ul className="flex flex-col gap-4 mt-4 overflow-auto sm:h-[400px] w-full lg:w-96">
            {orderFinished?.map((order) => (
              <li
                key={order.id}
                className="flex justify-between items-center border border-green-600
              shadow-sm shadow-green-200 rounded-xl p-3 w-full lg:w-80"
              >
                <div className="flex gap-4">
                  <Image
                    src={order.productOrder[0].product.imgCover}
                    alt={order.nameCostumer}
                    width={50}
                    height={50}
                  />
                  <div>
                    <span className="font-semibold text-sm lg:text-base">
                      {order.code} - {order.nameCostumer}
                    </span>
                    <div className="flex flex-col">
                      {order.productOrder.map((item) => (
                        <span className="text-xs" key={item.id}>
                          {item.amount}X {item.product.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    title="Remover"
                    className="p-2 rounded-lg bg-red-100"
                    onClick={() => changeStatusOrder(order.id, "delivered")}
                  >
                    <IoMdClose color="rgb(185 28 28)" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Kitchen;
