import { OrderItem } from "./OrderItem";

export type Order = {
  orderId: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalPrice: number;
  notes: string;
  orderStatus: string;
  paymentStatus: string;
  paymentMethod: string;
  created: string;
  createdDate: string;
  orderItems: OrderItem[];
};
