import z from "zod";

export const orderSchema = z.object({
  id: z.number(),
  nameCostumer: z.string(),
  status: z.string(),
  code: z.number(),
  total: z.number(),
  createdAt: z.date(),
  productOrder: z.array(
    z.object({
      id: z.number(),
      amount: z.number(),
      note: z.string().nullish(),
      additionalIds: z
        .array(
          z.object({
            id: z.number(),
            name: z.string(),
            description: z.string(),
            price: z.string(),
          })
        )
        .nullish(),
      product: z.object({
        id: z.number(),
        name: z.string(),
        imgCover: z.string(),
      }),
    })
  ),
  payment: z.array(
    z.object({
      id: z.number(),
      type: z.string(),
      change: z.string(),
      total: z.string(),
    })
  ),
});

const createOrderSchema = orderSchema
  .omit({
    id: true,
    status: true,
    createdAt: true,
    productOrder: true,
    payment: true,
  })
  .extend({
    code: z.number(),
    productOrder: z.array(z.number()),
    payment: z.object({
      type: z.enum<string, ["inCash", "credit", "debit"]>([
        "inCash",
        "credit",
        "debit",
      ]),
      change: z.number(),
      total: z.number(),
    }),
  });

export type TCreateOrder = z.infer<typeof createOrderSchema>;

export type TOrder = z.infer<typeof orderSchema>;

export type OrderContextValues = {
  orders: TOrder[] | undefined;
  countOrder: number;
  createOrder: (formData: TCreateOrder) => Promise<void>;
  isOpenModal: boolean;
  openModal: () => void;
  closeModal: () => void;
  printOrder: (dataId: number) => void;
  changeStatusOrder: (id: number, status: string) => Promise<void>;
  deleteOrder: (id: number) => Promise<void>;
};
