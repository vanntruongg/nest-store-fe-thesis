import { Product } from "./product.model";

interface Cart {
  email: string;
  items: Item[];
  totalPrice: number;
}

interface Item {
  productId: number;
  price?: number;
  quantity: number;
}

interface ItemCheckout {
  id: number;
  price: number;
  name: string;
  image: string;
  quantity: number;
}

interface ItemResponse {
  product: Product;
  quantity: number;
}

interface CartResponse {
  email: string;
  items: ItemResponse[];
  totalPrice: number;
}
interface CartRequest {
  email: string;
  itemDto: {
    productId: number;
    quantity: number;
  };
}
interface UpdateCartRequest {
  email: string;
  itemId: number;
  quantity: number;
}

export type {
  ItemCheckout,
  ItemResponse,
  CartResponse,
  Cart,
  Item,
  CartRequest,
  UpdateCartRequest,
};
