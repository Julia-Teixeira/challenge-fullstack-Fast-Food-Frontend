"use client";
import CategoryList from "@/components/categoryList";
import ModalAddOrder from "@/components/modalAddOrder";
import ProductList from "@/components/productList";
import Search from "@/components/search";
import { useProduct } from "@/provider/productProvider";
import { useRouter } from "next/navigation";
import { IoIosRemoveCircleOutline } from "react-icons/io";

export default function Home() {
  const {
    isOpenModal,
    productOrder,
    products,
    setProductOrder,
    deleteProductOrder,
  } = useProduct();

  const router = useRouter();

  const cancelOrders = () => {
    productOrder?.map(async (item) => await deleteProductOrder(item.id));
    setProductOrder([]);
  };

  const cancelOrder = async (id: number) => {
    await deleteProductOrder(id);
    setProductOrder(productOrder?.filter((item) => item.id !== id));
  };
  return (
    <div className="flex flex-col ">
      <h1 className="text-3xl font-bold text-black pt-8 lg:pt-20">
        Seja bem vindo!
      </h1>
      <Search />
      <CategoryList />
      <ProductList />
      {productOrder?.length !== 0 && (
        <div className="w-full flex flex-col gap-8 mt-4 p-4 border border-[#9F9F9F] rounded-md">
          {productOrder?.map((item) => (
            <div key={item.id}>
              <p className="w-full flex justify-between text-xs font-mono text-gray-800">
                <span>
                  {item.amount}x{" "}
                  {
                    products?.find((product) => product.id === item.productId)
                      ?.name
                  }
                </span>
                <span className="flex gap-2">
                  {Number(
                    products?.find((product) => product.id === item.productId)
                      ?.price
                  ).toLocaleString(`pt-BR`, {
                    style: `currency`,
                    currency: `BRL`,
                  })}
                  <button
                    type="button"
                    title="Remover item"
                    onClick={() => cancelOrder(item.id)}
                  >
                    <IoIosRemoveCircleOutline color="#f00" />
                  </button>
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
                    className="w-full flex justify-between text-xs font-mono text-gray-800 pl-6"
                    key={add.id}
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
      )}

      <div className="w-full flex flex-wrap gap-8 justify-center md:justify-end mt-4 mb-4">
        <button
          onClick={() => cancelOrders()}
          type="button"
          disabled={productOrder?.length === 0 && true}
          className="w-64 border-2 border-[#125C13] outline-none rounded-2xl py-2 text-[#125C13] disabled:text-[#9F9F9F] disabled:border-[#9F9F9F] font-semibold"
        >
          Cancelar
        </button>
        <button
          onClick={() => router.push("/payments")}
          type="button"
          disabled={productOrder?.length === 0 && true}
          className="w-64 border-2 outline-none rounded-2xl py-2 bg-[#125C13] disabled:bg-[#9F9F9F] text-white font-semibold"
        >
          Finalizar Pedido
        </button>
      </div>
      {isOpenModal && <ModalAddOrder />}
    </div>
  );
}
