import { format, parseISO } from "date-fns";
import { Address } from "~/modules/address/modules/Address";

export class OrderUtil {
  static formatDate(createDate: string) {
    return format(parseISO(createDate), "dd/MM/yyyy HH:mm:ss");
  }

  static combineAddress(address: Address) {
    return `${address.street}, ${address.ward.name}, ${address.district.name}, ${address.province.name}`;
  }
}

export const orderStatusList = [
  {
    status: "PENDING",
    displayName: "Chờ xác nhận",
  },
  {
    status: "ACCEPTED",
    displayName: "Đã chấp nhận",
  },
  {
    status: "SHIPPING",
    displayName: "Vận chuyển",
  },
  {
    status: "COMPLETED",
    displayName: "Hoàn thành",
  },
  {
    status: "CANCELED",
    displayName: "Đã hủy",
  },
];

export function displayOrderStatus(statusCode: string): string {
  const foundStatus = orderStatusList.find(
    (status) => status.status === statusCode
  );
  return foundStatus ? foundStatus.displayName : "Trạng thái đơn hàng";
}

export const paymentMethodList = [
  {
    method: "VN_PAY",
    displayName: "Ví VN Pay",
  },
  {
    method: "COD",
    displayName: "Thanh toán khi nhận hàng",
  },
];

export function displayPaymentMethod(method: string | undefined): string {
  const foundMethod = paymentMethodList.find(
    (status) => status.method === method
  );
  return foundMethod ? foundMethod.displayName : "Phương thức thanh toán";
}
