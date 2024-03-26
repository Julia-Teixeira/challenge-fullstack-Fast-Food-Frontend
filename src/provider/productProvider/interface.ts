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

export const additionalListSchema = z.object({
  id: z.number(),
  name: z.string(),
  imgCover: z.string(),
  createdAt: z.date(),
  description: z.string().nullish(),
  price: z.string(),
  type: z.string(),
});

export const productOrderFormDataSchema = z.object({
  productId: z.number(),
  amount: z.number(),
  note: z.string().nullish(),
  total: z.number(),
  additionalIds: z.array(z.number()).nullish(),
});

export const productOrderSchema = productOrderFormDataSchema
  .omit({ additionalIds: true })
  .extend({
    id: z.number(),
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
  });

export type TProduct = z.infer<typeof productSchema>;
export type TCategoryList = z.infer<typeof categoryListSchema>;
export type TAdditionalList = z.infer<typeof additionalListSchema>;
export type TProductOrder = z.infer<typeof productOrderSchema>;
export type TProductOrderFormData = z.infer<typeof productOrderFormDataSchema>;

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
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectdProduct: TProduct | undefined;
  setSelectedProduct: React.Dispatch<
    React.SetStateAction<TProduct | undefined>
  >;
  additionalProducts: TAdditionalList[] | undefined;
  productOrder: TProductOrder[] | undefined;
  setProductOrder: React.Dispatch<
    React.SetStateAction<TProductOrder[] | undefined>
  >;
  createProductOrder: (formData: TProductOrderFormData) => Promise<void>;
  deleteProductOrder: (id: number) => Promise<void>;
}
