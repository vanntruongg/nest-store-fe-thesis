import { SizeWithQuantity } from "./common.model";
import { Product } from "./product.model";

interface Cart {
  items: CartItem[];
}

interface CartItem {
  product: Product;
  sizeQuantities: SizeWithQuantity[];
}

interface CartRequest {
  email: string;
  productId: number;
  size: string;
  quantity: number;
}
interface UpdateCartRequest {
  email: string;
  productId: number;
  size: string;
  quantity: number;
}

type DelteCartRequest = Omit<UpdateCartRequest, "quantity">;

export type {
  Cart,
  CartItem,
  CartRequest,
  UpdateCartRequest,
  DelteCartRequest,
};
