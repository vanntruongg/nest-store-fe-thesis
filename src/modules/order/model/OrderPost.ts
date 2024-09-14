export type OrderPost = {
  name: string;
  phone: string;
  address: string;
  notes: string;
  paymentMethod: string;
  orderItemRequests: {
    productId: number;
    productImage: string;
    productName: string;
    productPrice: number;
    quantity: number;
    size: string;
  }[];
};
