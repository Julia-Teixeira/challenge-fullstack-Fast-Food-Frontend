"use client";
import { useProduct } from "@/provider/productProvider";
import { GiWallet } from "react-icons/gi";
import { FaCreditCard, FaMoneyBillAlt } from "react-icons/fa";

const PaymentPage = () => {
  const { productOrder, products } = useProduct();

  console.log(productOrder);
  return (
    <section className="text-black">
      <h1 className="text-3xl font-bold text-black mt-12 flex gap-4">
        <GiWallet size={30} color="#125C13" />
        Pagamento
      </h1>
      <div className="w-full flex justify-between mt-4 gap-10">
        <div className="w-1/2">
          <p className="text-xs font-bold mt-6">Resumo da compra</p>
          {productOrder?.length !== 0 && (
            <div className="w-full flex flex-col gap-8 mt-2 p-4 border border-[#9F9F9F] rounded-md">
              {productOrder?.map((item) => (
                <p className="w-full flex justify-between text-xs font-mono text-gray-800">
                  <span>
                    {item.amount}x{" "}
                    {
                      products?.find((product) => product.id === item.productId)
                        ?.name
                    }
                  </span>
                  {/* {item.additionalIds?.length !== 0 &&
                    item.additionalIds!.map((additional) => (
                      <span>{additional}</span>
                    ))} */}
                  <span>
                    {Number(item.total).toLocaleString(`pt-BR`, {
                      style: `currency`,
                      currency: `BRL`,
                    })}
                  </span>
                </p>
              ))}

              <div>
                <div className="border-dashed border-[1px] border-gray-300 w-full" />
                <div className="w-full flex justify-between mt-4">
                  <p className="w-full flex justify-between text-xs font-mono text-gray-800 mt-2">
                    Total do pedido:
                  </p>
                  <span className="font-bold text-2xl font-sans text-gray-800">
                    {productOrder
                      ?.reduce((total, item) => total + Number(item.total), 0)
                      .toLocaleString(`pt-BR`, {
                        style: `currency`,
                        currency: `BRL`,
                      })}
                  </span>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-between gap-6">
            <div className="w-[65%]">
              <p className="text-xs font-bold mt-6">Noma do cliente</p>
              <input
                title="Nome do cliente"
                placeholder="Primeiro nome"
                type="text"
                className="bg-[#F4F4F4] p-3 rounded w-full outline-none text-black text-sm mt-2"
              />
            </div>
            <div className="w-[35%]">
              <p className="text-xs font-bold mt-6">Código</p>
              <input
                title="Código"
                defaultValue="200"
                type="text"
                className="bg-[#F4F4F4] p-3 w-full rounded outline-none text-black text-sm mt-2 font-semibold"
              />
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <p className="text-xs font-bold mt-6">
            Selecione a forma de pagamento
          </p>
          <form>
            <div className="w-full flex justify-between mt-2 p-4 border border-[#9F9F9F] rounded-md">
              <div className="flex gap-4 items-center">
                <FaCreditCard color="#125C13" />
                <span className="font-bold text-sm">Débito</span>
              </div>

              <input
                type="checkbox"
                title={"debit"}
                value={"debit"}
                className="peer relative rounded-full appearance-none shrink-0 w-4 h-4 border-[1px] border-[#125C13] mt-1 bg-white
                    focus:outline-none focus:ring-offset-0 focus:ring-1 focus:ring-blue-100
                    checked:bg-[#125C13] checked:border-0
                    disabled:border-steel-400 disabled:bg-steel-400"
              />
            </div>

            <div className="w-full flex justify-between mt-2 p-4 border border-[#9F9F9F] rounded-md">
              <div className="flex gap-4 items-center">
                <FaCreditCard color="#125C13" />
                <span className="font-bold text-sm">Crédito</span>
              </div>
              <input
                type="checkbox"
                title={"credit"}
                value={"credit"}
                className="peer relative rounded-full appearance-none shrink-0 w-4 h-4 border-[1px] border-[#125C13] mt-1 bg-white
                    focus:outline-none focus:ring-offset-1 focus:ring-1 focus:ring-blue-100
                    checked:bg-[#125C13] checked:border-0
                    disabled:border-steel-400 disabled:bg-steel-400"
              />
            </div>

            <div className="w-full flex justify-between mt-2 p-4 border border-[#9F9F9F] rounded-md ">
              <div className="flex gap-4 items-center">
                <FaMoneyBillAlt color="#125C13" />
                <span className="font-bold text-sm">Dinheiro</span>
              </div>

              <input
                type="checkbox"
                title={"inCash"}
                value={"inCash"}
                className="peer relative rounded-full appearance-none shrink-0 w-4 h-4 border-[1px] border-[#125C13] mt-1 bg-white
                    focus:outline-none focus:ring-offset-0 focus:ring-1 focus:ring-blue-100
                    checked:bg-[#125C13] checked:border-0
                    disabled:border-steel-400 disabled:bg-steel-400"
              />
            </div>

            <div className="flex justify-between gap-6">
              <div className="w-1/2">
                <p className="text-xs font-bold mt-6">Valor Entregue</p>
                <input
                  title="Valor Entregue"
                  defaultValue={productOrder
                    ?.reduce((total, item) => total + Number(item.total), 0)
                    .toLocaleString(`pt-BR`, {
                      style: `currency`,
                      currency: `BRL`,
                    })}
                  type="text"
                  className="bg-[#F4F4F4] p-3 rounded w-full outline-none text-black text-sm mt-2"
                />
              </div>
              <div className="w-1/2">
                <p className="text-xs font-bold mt-6">Troco</p>
                <input
                  title="Troco"
                  defaultValue={Number(0).toLocaleString(`pt-BR`, {
                    style: `currency`,
                    currency: `BRL`,
                  })}
                  type="number"
                  className="bg-[#F4F4F4] p-3 w-full rounded outline-none text-black text-sm mt-2 font-semibold"
                />
              </div>
            </div>
          </form>

          <div className="w-full flex gap-8 justify-end mt-4 text-xs">
            <button
              type="button"
              className="border outline-none rounded-xl py-2 px-6 border-[#125C13]  text-[#125C13]  font-semibold"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="border-none outline-none rounded-xl py-2 px-6 bg-[#125C13]  text-white font-semibold"
            >
              Finalizar Pedido
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentPage;
