import { z } from "zod";

export const paginationSchema = z.object({
  total: z.number(),
  lastPage: z.number(),
  currentPage: z.number(),
  perPage: z.number(),
  prev: z.number().nullish(),
  next: z.number().nullish(),
});
