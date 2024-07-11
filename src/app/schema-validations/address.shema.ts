import { z } from "zod";

export const AddressShema = z.object({
  name: z.string().min(1, { message: "Vui lòng nhập họ và tên" }),
  phone: z
    .string()
    .min(1, { message: "Vui lòng nhập số điện thoại" })
    .max(11, { message: "Số điện thoại không hợp lệ" }),
  wardId: z.number().min(1, "Phường/Xã").default(0),
  districtId: z.number().min(1, "Quận/Huyện").default(0),
  provinceId: z.number().min(1, "Tỉnh/Thành Phố").default(0),
  street: z.string().min(1, { message: "Vui lòng nhập địa chỉ cụ thể" }),
  isDefault: z.boolean(),
});

export type AddressShemaType = z.TypeOf<typeof AddressShema>;
