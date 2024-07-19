import { EPaymentMethod } from "../utility/enum.util";

interface IOrder {
  orderId: number;
  name: string;
  email: string;
  phone: string;
  address: UserAddressOrder;
  totalPrice: number;
  notes: string;
  orderStatus: string;
  paymentMethod: string;
  createdDate: string;
  orderDetail: IOrderDetail[];
}

interface UserAddressOrder {
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
interface IOrderRequest {
  email: string;
  addressId: number;
  totalPrice: number;
  notes: string;
  paymentMethodId: number;
  listProduct: IOrderDetailRequest[];
}
interface IOrderDetail {
  orderDetailId: number;
  productId: number;
  productName: string;
  quantity: number;
  productPrice: number;
  productImage: string;
}

type IOrderDetailRequest = Omit<IOrderDetail, "orderDetailId">;

interface IPaymentMethod {
  paymentMethodId: number;
  method: EPaymentMethod;
  description: string;
}

export type {
  IOrderShippingDetail,
  IOrderRequest,
  IOrderDetailRequest,
  IPaymentMethod,
  IOrder,
  IOrderDetail,
};
