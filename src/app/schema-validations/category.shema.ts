import { z } from "zod";

const ParentCategorySchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const CategorySchema = z.object({
  name: z.string().min(1, { message: "Chọn danh mục sản phẩm" }),
  imageUrl: z.string(),
  category: ParentCategorySchema,
});

export type CategoryShemaCreateType = z.TypeOf<typeof CategorySchema>;

export const UpdateCategoryShema = z.object({
  id: z.number(),
  name: z.string().min(1, { message: "Chọn danh mục sản phẩm" }),
  imageUrl: z.string(),
  category: ParentCategorySchema,
  isTopLevel: z.boolean(),
});

export type UpdateCategoryShemaType = z.TypeOf<typeof UpdateCategoryShema>;
