"use client";
import { useProduct } from "@/provider/productProvider";
import { TProductOrderFormData } from "@/provider/productProvider/interface";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdRemove, IoMdAdd, IoMdClose } from "react-icons/io";

const ModalAddOrder = () => {
  const {
    setIsOpenModal,
    selectdProduct,
    setSelectedProduct,
    additionalProducts,
    createProductOrder,
  } = useProduct();

  const { register, handleSubmit } = useForm({});

  const [quantity, setQuantity] = useState(1);

  const closeModal = () => {
    setSelectedProduct(undefined);
    setIsOpenModal(false);
  };
  const handleAddQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleRemoveQuantity = () => {
    setQuantity(quantity - 1);
  };

  const onSubmit = async (data: any) => {
    let productOrder: any = {};
    if (data.additional) {
      productOrder = {
        productId: selectdProduct!.id,
        amount: quantity,
        note: data.note,
        total: quantity * Number(selectdProduct!.price),
        additionalIds: data.additional.map((item: string) => Number(item)),
      };
    } else {
      productOrder = {
        productId: selectdProduct!.id,
        amount: quantity,
        note: data.note,
        total: quantity * Number(selectdProduct!.price),
      };
    }

    await createProductOrder(productOrder);

    setIsOpenModal(false);
  };

  return (
    <div className="modal">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#fefefe] px-8 md:px-14 py-7 rounded-xl w-[95%] md:w-[80%] lg:w-[60%] my-[5%] mx-auto md:my-[10%]  text-black"
      >
        <div className="flex justify-between h-10">
          <h2 className="font-bold text-lg ">Revise seu pedido!</h2>
          <span className=" cursor-pointer" onClick={() => closeModal()}>
            <IoMdClose color="#9F9F9F" />
          </span>
        </div>
        <div className="flex justify-between flex-col sm:flex-row mt-6">
          <div className="flex flex-col sm:flex-row gap-4 w-[70%]">
            <div className="flex gap-4 flex-col items-center m-auto bg-red-500 max-w-40 w-[400px] h-36 rounded-xl shadow-sm">
              <div className="relative h-16 w-full">
                <Image
                  src={selectdProduct!.imgCover}
                  alt={selectdProduct!.name}
                  width={100}
                  height={100}
                  className="w-[100px] h-[100px] absolute bottom-[-50px] right-[30px] rounded-full "
                />
              </div>
              <div className="flex flex-col items-center bg-white w-full rounded-s-xl rounded-r-xl h-20"></div>
            </div>

            <div className="max-w-96">
              <p className="font-bold">{selectdProduct?.name}</p>
              <span className="text-xs text-gray-800">
                {selectdProduct?.description}
              </span>

              <div className="flex gap-4 border-[1px] rounded-2xl w-20 h-7 border-[#125C13] items-center relative mt-4">
                <p
                  onClick={() => handleRemoveQuantity()}
                  className="bg-[#125C13] rounded-2xl w-7 h-7 text-white text-center flex items-center justify-center absolute left-[-2px] cursor-pointer"
                >
                  <IoMdRemove size={20} />
                </p>
                <p className="absolute left-[37px]">{quantity}</p>
                <p
                  onClick={() => handleAddQuantity()}
                  className="bg-[#125C13] rounded-2xl w-7 h-7 text-white flex items-center justify-center absolute right-[-4px] cursor-pointer"
                >
                  <IoMdAdd size={20} />
                </p>
              </div>
            </div>
          </div>
          <div>
            <p className="font-bold mt-7 mr-7">
              {Number(selectdProduct?.price).toLocaleString(`pt-BR`, {
                style: `currency`,
                currency: `BRL`,
              })}
            </p>
          </div>
        </div>
        {selectdProduct?.categoryId !== 1 ? null : (
          <div className=" mt-12">
            <p className="font-bold ">Adicionais</p>
            <span className="text-xs">
              Selecione os ingredientes que você quer adicionar a mais no seu
              lanche
            </span>
            <div className="flex flex-col gap-6 mt-4">
              {additionalProducts?.map((additional) => (
                <div key={additional.id} className="flex justify-between">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 shadow-md rounded-md flex items-center justify-center">
                      <Image
                        src={additional.imgCover}
                        width={70}
                        height={70}
                        alt={`Imagem do ${additional.name}`}
                        className="w-auto h-auto"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-sm">{additional.name}</p>
                      <p className="text-xs text-gray-800">
                        {additional.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <p className="font-bold text-[#9F9F9F] text-xs">
                      {Number(additional.price).toLocaleString(`pt-BR`, {
                        style: `currency`,
                        currency: `BRL`,
                      })}
                    </p>
                    <input
                      {...register(`additional`)}
                      type="checkbox"
                      title={additional.name}
                      value={additional.id}
                      className="peer relative rounded-full appearance-none shrink-0 w-4 h-4 border-[1px] border-[#125C13] mt-1 bg-white
                    focus:outline-none focus:ring-offset-0 focus:ring-1 focus:ring-blue-100
                    checked:bg-[#125C13] checked:border-0
                    disabled:border-steel-400 disabled:bg-steel-400"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <p className="font-bold mt-12 ">Observações</p>
          <textarea
            {...register(`note`)}
            placeholder="Adicione alguma observação ao pedido"
            className="placeholder:text-[#9F9F9F] bg-[#F4F4F4] w-full h-24 resize-none rounded-lg p-4 text-sm mt-4 outline-none"
          />
        </div>

        <div className="w-full flex flex-col gap-8 mt-4 p-4 border border-[#9F9F9F] rounded-md">
          <p className="w-full flex justify-between text-xs font-mono text-gray-800">
            <span>
              {quantity}x {selectdProduct?.name}
            </span>
            <span>
              {(Number(selectdProduct?.price) * quantity).toLocaleString(
                `pt-BR`,
                {
                  style: `currency`,
                  currency: `BRL`,
                }
              )}
            </span>
          </p>

          <div>
            <div className="border-dashed border-[1px] border-gray-300 w-full" />
            <p className="w-full flex justify-between text-xs font-mono text-gray-800 mt-2">
              Total do pedido:
            </p>
            <span className="font-bold text-2xl font-sans text-gray-800">
              {(Number(selectdProduct?.price) * quantity).toLocaleString(
                `pt-BR`,
                {
                  style: `currency`,
                  currency: `BRL`,
                }
              )}
            </span>
          </div>
        </div>

        <div className="w-full flex gap-8 justify-end mt-4 text-xs">
          <button
            type="button"
            className="border outline-none rounded-xl py-2 px-6 border-[#125C13]  text-[#125C13]  font-semibold"
          >
            Continuar adicionando
          </button>

          <button
            type="submit"
            className="border-none outline-none rounded-xl py-2 px-6 bg-[#125C13]  text-white font-semibold"
          >
            Adicionar ao pedido
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalAddOrder;
