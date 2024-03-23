import z from "zod";

export const orderSchema = z.object({
  id: z.number(),
  nameCostumer: z.string(),
  status: z.string(),
  total: z.number(),
  createdAt: z.date(),
});

const createOrderSchema = orderSchema
  .omit({ id: true, status: true, createdAt: true })
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
};