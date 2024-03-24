"use client";
import { useOrder } from "@/provider/orderProvider";

const Delivery = () => {
  const { orders } = useOrder();
  const ordersOnGoing = orders?.filter((order) => order.status === "onGoing");
  const ordersFinished = orders?.filter((order) => order.status === "finished");

  return (
    <section className="flex justify-between text-black h-[600px] mt-8">
      <div>
        <h2 className="font-bold text-3xl">Preparando:</h2>
        <ul className="flex flex-col gap-4 mt-4 overflow-auto h-[400px] w-96">
          {ordersOnGoing?.map((order) => (
            <li key={order.id}>
              <span className="font-semibold text-6xl text-gray-500">
                {order.nameCostumer}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="h-full w-[5px] bg-black rounded" />

      <div>
        <h2 className="font-bold text-3xl">Pronto:</h2>
        <ul className="flex flex-col gap-4 mt-4 overflow-auto h-[400px] w-96">
          {ordersFinished?.map((order) => (
            <li key={order.id}>
              <div>
                <span className="font-semibold text-6xl text-green-800">
                  {order.nameCostumer}
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
