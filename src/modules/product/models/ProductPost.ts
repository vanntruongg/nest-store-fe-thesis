import { SizeQuantity } from "./SizeQuantity";

export type ProductPost = {
  name: string;
  price: number;
  material: string;
  style: string;
  imageUrl: string;
  description: string;
  stock: SizeQuantity[];
  categoryId: number;
};
