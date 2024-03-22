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

export const categoryListSchema = z.object({
  id: z.number(),
  name: z.string(),
  imgCover: z.string(),
  createdAt: z.date(),
  product: z.array(productSchema),
});

export type TProduct = z.infer<typeof productSchema>;
export type TCategoryList = z.infer<typeof categoryListSchema>;

export interface ProductContextValues {
  products: TProduct[] | undefined;
  setProducts: React.Dispatch<React.SetStateAction<TProduct[] | undefined>>;
  isLoading: boolean;
  getProducts: () => Promise<void>;
  categories: TCategoryList[] | undefined;
  getAllCategories: () => Promise<void>;
  selectedProducts: TProduct[] | undefined;
  setSelectedProducts: React.Dispatch<
    React.SetStateAction<TProduct[] | undefined>
  >;
  search: TProduct[] | undefined;
  setSearch: React.Dispatch<React.SetStateAction<TProduct[] | undefined>>;
}
