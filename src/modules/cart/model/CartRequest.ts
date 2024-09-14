type CartItem = {
  productId: number;
  size: string;
  quantity: number;
};

export type CartPost = CartItem;
export type CartPut = CartItem;
export type CartDelete = Omit<CartItem, "quantity">;
