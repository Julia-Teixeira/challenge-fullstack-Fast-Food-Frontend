"use client";
import CategoryList from "@/components/categoryList";
import ModalAddOrder from "@/components/modalAddOrder";
import ProductList from "@/components/productList";
import Search from "@/components/search";
import { useProduct } from "@/provider/productProvider";
import { TProductOrder } from "@/provider/productProvider/interface";

export default function Home() {
  const { isOpenModal, productOrder, products, setProductOrder } = useProduct();

  const cancelOrder = () => {
    setProductOrder([]);
  };

  return (
    <div className="flex flex-col ">
      <h1 className="text-3xl font-bold text-black pt-20">Seja bem vindo!</h1>
      <Search />
      <CategoryList />
      <ProductList />
      {productOrder?.length !== 0 && (
        <div className="w-full flex flex-col gap-8 mt-4 p-4 border border-[#9F9F9F] rounded-md">
          {productOrder?.map((item) => (
            <p className="w-full flex justify-between text-xs font-mono text-gray-800">
              <span>
                {item.amount}x{" "}
                {
                  products?.find((product) => product.id === item.productId)
                    ?.name
                }
              </span>
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

      <div className="w-full flex gap-8 justify-end mt-4">
        <button
          onClick={cancelOrder}
          type="button"
          disabled={!productOrder && true}
          className="w-64 border-2 border-[#125C13] outline-none rounded-2xl py-2 text-[#125C13] disabled:text-[#9F9F9F] font-semibold"
        >
          Cancelar
        </button>
        <button
          type="button"
          disabled={!productOrder && true}
          className="w-64 border-2 outline-none rounded-2xl py-2 bg-[#125C13] disabled:bg-[#9F9F9F] text-white font-semibold"
        >
          Finalizar Pedido
        </button>
      </div>
      {isOpenModal && <ModalAddOrder />}
    </div>
  );
}
