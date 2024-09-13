import { Image } from "./Image";
import { SizeQuantity } from "./SizeQuantity";

export type Product = {
  id: number;
  name: string;
  price: number;
  material: string;
  style: string;
  category: Category;
  images: Image[];
  sizeQuantity: SizeQuantity[];
};
