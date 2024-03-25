"use client";
import { useProduct } from "@/provider/productProvider";
import { GiWallet } from "react-icons/gi";
import { FaCreditCard, FaMoneyBillAlt } from "react-icons/fa";
import { useOrder } from "@/provider/orderProvider";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ModalOrderFinished from "@/components/modalOrderFinished";

const PaymentPage = () => {
  const { productOrder, products } = useProduct();
  const { createOrder, countOrder, isOpenModal, printOrder } = useOrder();
  const router = useRouter();

  const [total, setTotal] = useState(0);
  const [typePayment, setTypePayment] = useState<"inCash" | "credit" | "debit">(
    "inCash"
  );

  const cancelOrder = () => {
    router.back();
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      nameCostumer: "",
      payment: {
        total: Number(
          productOrder?.reduce((total, item) => total + Number(item.total), 0)
        )
          .toFixed(2)
          .toString(),
      },
    },
  });

  const handleSubmitForm = async (data: {
    nameCostumer: string;
    payment: { total: string };
  }) => {
    const formData = {
      code: Number(200 + countOrder),
      nameCostumer: data.nameCostumer,
      productOrder: productOrder?.map((item) => item.id)!,
      total: Number(
        productOrder?.reduce((acc, curr) => acc + Number(curr.total), 0)
      ),
      payment: {
        type: typePayment,
        change:
          total === 0
            ? 0
            : total -
              Number(
                productOrder?.reduce(
                  (total, item) => total + Number(item.total),
                  0
                )
              ),
        total: Number(data.payment.total),
      },
    };
    await createOrder(formData);
  };
  return (
    <>
      <section className="text-black">
        {isOpenModal && <ModalOrderFinished />}
        <h1 className="text-3xl font-bold text-black mt-12 flex gap-4">
          <GiWallet size={30} color="#125C13" />
          Pagamento
        </h1>
        <form onSubmit={handleSubmit(handleSubmitForm)} className="w-full">
          <div className="w-full flex flex-col sm:flex-row justify-between mt-4 gap-10">
            <div className="sm:w-[40%]">
              <p className="text-xs font-bold mt-6">Resumo da compra</p>
              {productOrder?.length !== 0 && (
                <div
                  id="resumo"
                  className="w-full flex flex-col gap-6 mt-2 p-4 border border-[#9F9F9F] rounded-md"
                >
                  {productOrder?.map((item) => (
                    <div key={item.id}>
                      <p className="w-full flex justify-between text-xs font-mono text-gray-800">
                        <span>
                          {item.amount}x{" "}
                          {
                            products?.find(
                              (product) => product.id === item.productId
                            )?.name
                          }
                        </span>
                        <span>
                          {Number(
                            products?.find(
                              (product) => product.id === item.productId
                            )?.price
                          ).toLocaleString(`pt-BR`, {
                            style: `currency`,
                            currency: `BRL`,
                          })}
                        </span>
                      </p>
                      <div>
                        {item?.additionalIds?.length! > 0 && (
                          <span className="text-xs font-mono text-gray-800 ml-5">
                            Adicionais:
                          </span>
                        )}
                        {item.additionalIds?.map((add) => (
                          <p
                            key={add.id}
                            className="w-full flex justify-between text-xs font-mono text-gray-800 pl-6"
                          >
                            <span>
                              - {add.name} - {add.description}
                            </span>
                            <span>
                              {Number(add.price).toLocaleString(`pt-BR`, {
                                style: `currency`,
                                currency: `BRL`,
                              })}
                            </span>
                          </p>
                        ))}
                      </div>
                      {item?.note && (
                        <div>
                          <p className="flex flex-col gap-1">
                            <span className="text-xs font-mono text-gray-800 ml-5">
                              Observação:
                            </span>
                            <span className="text-xs font-mono text-gray-800 ml-6">
                              {item.note}
                            </span>
                          </p>
                        </div>
                      )}
                    </div>
                  ))}

                  <div>
                    <div className="border-dashed border-[1px] border-gray-300 w-full" />
                    <div className="w-full flex justify-between mt-4">
                      <p className="w-full flex justify-between text-xs font-mono text-gray-800 mt-2">
                        Total do pedido:
                      </p>
                      <span className="font-bold text-2xl font-sans text-gray-800">
                        {productOrder
                          ?.reduce(
                            (total, item) => total + Number(item.total),
                            0
                          )
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
                    {...register(`nameCostumer`, {
                      required: true,
                      minLength: 3,
                    })}
                    title="Nome do cliente"
                    placeholder="Primeiro nome"
                    type="text"
                    className="bg-[#F4F4F4] p-3 rounded w-full outline-none text-black text-sm mt-2"
                  />
                  {errors.nameCostumer && (
                    <span className="text-red-500">
                      Insira o nome do cliente
                    </span>
                  )}
                </div>
                <div className="w-[35%]">
                  <p className="text-xs font-bold mt-6">Código</p>
                  <input
                    disabled
                    title="Código"
                    value={Number(200 + countOrder)}
                    type="number"
                    className="bg-[#F4F4F4] p-3 w-full rounded outline-none text-black text-sm mt-2 font-semibold"
                  />
                </div>
              </div>
            </div>
            <div className="sm:w-[40%]">
              <p className="text-xs font-bold mt-6">
                Selecione a forma de pagamento
              </p>

              <div className="w-full flex justify-between mt-2 p-4 border border-[#9F9F9F] rounded-md">
                <div className="flex gap-4 items-center">
                  <FaCreditCard color="#125C13" />
                  <span className="font-bold text-sm">Débito</span>
                </div>

                <label
                  className="relative flex items-center rounded-full cursor-pointer"
                  htmlFor="debit"
                >
                  <input
                    onChange={() => setTypePayment("debit")}
                    checked={typePayment === "debit"}
                    type="radio"
                    id="debit"
                    name="payment"
                    title={"debit"}
                    value={"debit"}
                    className="before:content[''] peer relative h-4 w-4 cursor-pointer
                   appearance-none rounded-full border border-[#125C13] text-[#125C13]
                   transition-all checked:border-[#125C13] checked:before:bg-[#125C13]
                    hover:before:opacity-10"
                  />
                  <span
                    className="absolute text-[#125C13] transition-opacity
                opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-2.5 w-2.5"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                    </svg>
                  </span>
                </label>
              </div>

              <div className="w-full flex justify-between mt-2 p-4 border border-[#9F9F9F] rounded-md">
                <div className="flex gap-4 items-center">
                  <FaCreditCard color="#125C13" />
                  <span className="font-bold text-sm">Crédito</span>
                </div>
                <label
                  className="relative flex items-center rounded-full cursor-pointer"
                  htmlFor="credit"
                >
                  <input
                    onChange={() => setTypePayment("credit")}
                    checked={typePayment === "credit"}
                    type="radio"
                    id="credit"
                    name="payment"
                    title={"credit"}
                    value={"credit"}
                    className="before:content[''] peer relative h-4 w-4 cursor-pointer
                   appearance-none rounded-full border border-[#125C13] text-[#125C13]
                   transition-all checked:border-[#125C13] checked:before:bg-[#125C13]
                    hover:before:opacity-10"
                  />
                  <span
                    className="absolute text-[#125C13] transition-opacity
                opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-2.5 w-2.5"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                    </svg>
                  </span>
                </label>
              </div>

              <div className="w-full flex justify-between mt-2 p-4 border border-[#9F9F9F] rounded-md ">
                <div className="flex gap-4 items-center">
                  <FaMoneyBillAlt color="#125C13" />
                  <span className="font-bold text-sm">Dinheiro</span>
                </div>

                <label
                  className="relative flex items-center rounded-full cursor-pointer"
                  htmlFor="inCash"
                >
                  <input
                    onChange={() => setTypePayment("inCash")}
                    checked={typePayment === "inCash"}
                    type="radio"
                    id="inCash"
                    name="payment"
                    title={"inCash"}
                    value={"inCash"}
                    className="before:content[''] peer relative h-4 w-4 cursor-pointer
                   appearance-none rounded-full border border-[#125C13] text-[#125C13]
                   transition-all checked:border-[#125C13] checked:before:bg-[#125C13]
                    hover:before:opacity-10"
                  />
                  <span
                    className="absolute text-[#125C13] transition-opacity
                opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-2.5 w-2.5"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                    </svg>
                  </span>
                </label>
              </div>

              <div className="flex justify-between gap-6">
                <div className="w-1/2">
                  <p className="text-xs font-bold mt-6">Valor Entregue</p>
                  <label
                    htmlFor="valorEntregue"
                    className="flex bg-[#F4F4F4] rounded w-full outline-none text-black text-sm items-center mt-2"
                  >
                    <span className="pl-2">R$</span>
                    <input
                      {...register("payment.total")}
                      title="Valor Entregue"
                      defaultValue={Number(
                        productOrder?.reduce(
                          (total, item) => total + Number(item.total),
                          0
                        )
                      ).toFixed(2)}
                      onChange={(e) => setTotal(Number(e.target.value))}
                      disabled={typePayment !== "inCash"}
                      type="text"
                      className="bg-[#F4F4F4] p-3 rounded w-full outline-none"
                    />
                  </label>
                </div>
                <div className="w-1/2">
                  <p className="text-xs font-bold mt-6">Troco</p>
                  <label
                    htmlFor="valorEntregue"
                    className="flex bg-[#F4F4F4] rounded w-full text-black text-sm items-center mt-2"
                  >
                    <span className="pl-2">R$</span>
                    <input
                      disabled
                      title="Troco"
                      value={(total === 0
                        ? 0
                        : total -
                          Number(
                            productOrder?.reduce(
                              (total, item) => total + Number(item.total),
                              0
                            )
                          )
                      ).toFixed(2)}
                      type="text"
                      className="bg-[#F4F4F4] p-3 w-full rounded outline-none"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex gap-8 justify-end mt-24 text-xs">
            <button
              onClick={() => cancelOrder()}
              type="button"
              className="w-[200px] border outline-none rounded-xl py-2 px-6 border-[#125C13]  text-[#125C13] font-semibold"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="w-[200px] border-none outline-none rounded-xl py-2 px-6 bg-[#125C13]  text-white font-semibold"
            >
              Finalizar Pedido
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default PaymentPage;
