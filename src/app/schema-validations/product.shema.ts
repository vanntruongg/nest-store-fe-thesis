import { z } from "zod";

const CategorySchema = z.object({
  id: z.number().min(1, { message: "Chọn danh mục sản phẩm" }),
  name: z.string().min(1, { message: "Chọn danh mục sản phẩm" }),
});

export const ProductShema = z.object({
  name: z.string().min(1, { message: "Vui lòng nhập tên sản phẩm" }).max(100),
  description: z.string().min(1, { message: "Thêm mô tả sản phẩm" }),
  price: z.coerce
    .number()
    .min(1000, { message: "Giá sản phẩm phải lớn hơn 1.000đ" })
    .refine((price) => !isNaN(price), {
      message: "Giá sản phẩm phải lớn hơn 1.000đ",
    })
    .default(0),
  material: z.string().max(50),
  style: z.string().max(50),
  imageUrl: z.string().min(1, { message: "Thêm ảnh sản phẩm" }),
  stock: z
    .array(
      z.object({
        size: z
          .string()
          .min(1, { message: "Thêm ít nhất một phân loại sản phẩm" }),
        quantity: z
          .number({
            invalid_type_error: "Số lượng không hợp lệ",
          })
          .min(1, { message: "Số lượng phải lớn hơn 0" }),
      })
    )
    .nonempty({ message: "Vui lòng thêm ít nhất một kích cỡ và số lượng" }),
  category: CategorySchema,
});

export type ProductShemaCreateType = z.TypeOf<typeof ProductShema>;

export const ProductShemaUpdate = ProductShema.omit({ stock: true });
export type ProductShemaUpdateType = z.TypeOf<typeof ProductShemaUpdate>;

export const InventoryUpdateSchema = z.object({
  stock: z
    .array(
      z.object({
        size: z
          .string()
          .min(1, { message: "Thêm ít nhất một phân loại sản phẩm" }),
        quantity: z.number({
          invalid_type_error: "Số lượng không hợp lệ",
        }),
      })
    )
    .nonempty({ message: "Vui lòng thêm ít nhất một kích cỡ và số lượng" }),
});

export type InventoryUpdateType = z.TypeOf<typeof InventoryUpdateSchema>;
