import ProductList from "@/components/productList";
import Search from "@/components/search";

export default function Home() {
  return (
    <div className="flex flex-col ">
      <h1 className="text-3xl font-bold text-black pt-20">Seja bem vindo!</h1>
      <Search />
      {/* <Categories/> fazer uma rota no backend para pegar as categorias */}
      <ProductList />
    </div>
  );
}
