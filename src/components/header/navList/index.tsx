import Link from "next/link";
import ItemNavList from "./itemNavList";

const NavList = () => {
  return (
    <ul className="flex gap-4 font-semibold text-sm  items-center">
      <Link href="/">
        <ItemNavList name="Pedidos" key="productOrder" pathName="/" />
      </Link>
      <Link href="/kitchen">
        <ItemNavList name="Cozinha" key="kitchen" pathName="/kitchen" />
      </Link>
      <Link href="/delivery">
        <ItemNavList name="Retirada" key="delivery" pathName="/delivery" />
      </Link>
    </ul>
  );
};

export default NavList;
