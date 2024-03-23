import { useOrder } from "@/provider/orderProvider";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import imgSucess from "../../../public/pedido-realizado-sucesso.png";

const ModalOrderFinished = () => {
  const { closeModal } = useOrder();
  return (
    <div className="modal">
      <div className="bg-[#fefefe] px-8 py-7 rounded-xl w-[95%] sm:w-[70%] md:w-[60%] xl:w-[40%] my-[20%] md:my-[10%] mx-auto text-black">
        <div className="flex justify-end h-10">
          <span className="cursor-pointer" onClick={() => closeModal()}>
            <IoMdClose color="#9F9F9F" />
          </span>
        </div>

        <div className="flex flex-col items-center gap-4 text-center">
          <Image
            src={imgSucess}
            width={300}
            height={300}
            alt="Pedido realizado com sucesso"
            className="w-auto h-auto"
          />
          <p className="text-2xl font-bold">Pedido finalizado com sucesso!</p>
          <span className="text-xs">
            O pedido foi encaminhado para a cozinha.
          </span>
        </div>
      </div>
    </div>
  );
};

export default ModalOrderFinished;
