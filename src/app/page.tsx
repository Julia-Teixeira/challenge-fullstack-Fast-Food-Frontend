import CategoryList from "@/components/categoryList";
import ProductList from "@/components/productList";
import Search from "@/components/search";

export default function Home() {
  return (
    <div className="flex flex-col ">
      <h1 className="text-3xl font-bold text-black pt-20">Seja bem vindo!</h1>
      <Search />
      <CategoryList />
      <ProductList />
      <div className="w-full flex gap-8 justify-end mt-4">
        <button
          type="button"
          className="w-64 border-2 outline-none rounded-2xl py-2 text-[#9F9F9F] font-semibold"
        >
          Cancelar
        </button>
        <button
          type="button"
          className="w-64 border-2 outline-none rounded-2xl py-2 bg-[#9F9F9F] text-white font-semibold"
        >
          Finalizar Pedido
        </button>
      </div>
    </div>
  );
}
