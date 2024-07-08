import { z } from "zod";

export const AddressShema = z.object({
  name: z.string().min(1, { message: "Vui lòng nhập họ và tên" }),
  phone: z.string().min(1, { message: "Vui lòng nhập số điện thoại" }).max(11),
  wardId: z
    .number()
    .min(1, "Phường/Xã")
    // .refine((wardId) => wardId === 0, {
    //   message: "Phường/Xã",
    // })
    .default(0),
  districtId: z
    .number()
    .min(1, "Quận/Huyện")
    // .refine((districtId) => districtId === 0, {
    //   message: "Quận/Huyện",
    // })
    .default(0),
  provinceId: z
    .number()
    .min(1, "Tỉnh/Thành Phố")
    // .refine((provinceId) => provinceId === 0, {
    //   message: "Tỉnh/Thành Phố",
    // })
    .default(0),
  street: z.string().min(1, { message: "Vui lòng nhập địa chỉ cụ thể" }),
  isDefault: z.boolean(),
});

export type AddressShemaType = z.TypeOf<typeof AddressShema>;
