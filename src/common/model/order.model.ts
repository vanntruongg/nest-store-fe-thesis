interface IOrder {
  orderId: number;
  name: string;
  email: string;
  phone: string;
  addressId: number;
  totalPrice: number;
  notes: string;
  orderStatus: string;
  paymentStatus: string;
  paymentMethod: string;
  created: string;
  createdDate: string;
  orderDetail: IOrderDetail[];
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

interface IOrderRequest {
  email: string;
  addressId: number;
  notes: string;
  paymentMethodId: number;
  listProduct: IOrderDetailRequest[];
}

interface IOrderDetail {
  orderDetailId: number;
  productId: number;
  quantity: number;
  size: string;
}

type IOrderDetailRequest = Omit<IOrderDetail, "orderDetailId">;

export type {
  IOrderShippingDetail,
  IOrderRequest,
  IOrderDetailRequest,
  IOrder,
  IOrderDetail,
  OrderDeliveryAddress,
};
