export type OrderItem = {
  orderDetailId: number;
  productId: number;
  productImage: string;
  productName: string;
  productPrice: number;
  sizeQuantityList: {
    quantity: number;
    size: string;
  }[];
};
