import { SizeQuantity } from "./SizeQuantity";

export type Product = {
  id: number;
  name: string;
  price: number;
  material: string;
  style: string;
  category: CategoryInProduct;
  imageUrl: string;
  description: string;
  sizeQuantity: SizeQuantity[];
};

export type CategoryInProduct = {
  id: number;
  name: string;
  image: string;
  parentCategory: CategoryInProduct;
};
