import { z } from "zod";

export const RatingShema = z.object({
  ratingStar: z
    .number()
    .min(1, "Số sao phải lớn hơn 1")
    .max(5, "Số sao tối đa là 5")
    .default(5),
  content: z.string().min(1, { message: "Nội dung đánh giá là bắt buộc." }),
});

export type RatingShemaType = z.TypeOf<typeof RatingShema>;
