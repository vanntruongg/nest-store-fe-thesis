import { Product } from "~/modules/product/models/Product";

export type CartItem = {
  product: Product;
  sizeQuantities: {
    size: string;
    quantity: number;
  }[];
};
