import { EPaymentMethod } from "./payment.model";

interface IOrder {
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
}

interface OrderDeliveryAddress {
  id: number;
  name: string;
  phone: string;
  street: string;
  ward: string;
  district: string;
  province: string;
}

interface IOrderShippingDetail {
  name: string;
  phone: string;
  address: number;
}

interface OrderRequest {
  name: string;
  phone: string;
  address: string;
  notes: string;
  paymentMethod: EPaymentMethod;
  orderItemRequests: OrderItemRequest[];
}

interface OrderItem {
  orderDetailId: number;
  productId: number;
  productImage: string;
  productName: string;
  productPrice: number;
  quantity: number;
  size: string;
}

type OrderItemRequest = Omit<OrderItem, "orderDetailId">;

export type {
  IOrderShippingDetail,
  OrderRequest,
  OrderItemRequest,
  IOrder,
  OrderItem,
  OrderDeliveryAddress,
};
