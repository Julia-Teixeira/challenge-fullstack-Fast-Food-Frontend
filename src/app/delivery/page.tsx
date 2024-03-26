"use client";
import { useOrder } from "@/provider/orderProvider";

const Delivery = () => {
  const { orders } = useOrder();
  const ordersOnGoing = orders?.filter((order) => order.status === "onGoing");
  const ordersFinished = orders?.filter((order) => order.status === "finished");

  return (
    <section className="flex flex-col sm:flex-row gap-8 lg:justify-between text-black h-[600px] mt-8">
      <div>
        <h2 className="font-bold text-3xl">Preparando:</h2>
        <ul className="flex flex-col gap-4 mt-4 overflow-auto h-[200px] md:h-[400px] lg:w-96">
          {ordersOnGoing?.map((order) => (
            <li key={order.id}>
              <span className="font-semibold text-2xl md:text-5xl text-gray-500">
                {order.code} - {order.nameCostumer}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full h-[5px] sm:h-full sm:w-[5px] bg-black rounded" />

      <div>
        <h2 className="font-bold text-3xl">Pronto:</h2>
        <ul className="flex flex-col gap-4 mt-4 overflow-auto h-[200px] md:h-[400px] lg:w-96">
          {ordersFinished?.map((order) => (
            <li key={order.id}>
              <div>
                <span className="font-semibold text-2xl md:text-5xl text-green-800">
                  {order.code} - {order.nameCostumer}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Delivery;
