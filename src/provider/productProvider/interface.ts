import { z } from "zod";

export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.string(),
  description: z.string().nullish(),
  imgCover: z.string(),
  categoryId: z.number(),
  createdAt: z.date(),
});

export type TProduct = z.infer<typeof productSchema>;

export interface ProductContextValues {
  products: TProduct[] | undefined;
  setProducts: React.Dispatch<React.SetStateAction<TProduct[] | undefined>>;
  isLoading: boolean;
  getProducts: () => Promise<void>;
}
