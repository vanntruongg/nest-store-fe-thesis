import { format, parseISO } from "date-fns";
import { Address } from "../model/address.model";

export class OrderUtil {
  static formatDate(createDate: string) {
    return format(parseISO(createDate), "dd/MM/yyyy HH:mm:ss");
  }

  static mapOrderStatus(status: string): string {
    const foundStatus = orderStatus.find((stt) => stt.type === status);
    return foundStatus ? foundStatus.typeName : "";
  }

  static combineAddress(address: Address) {
    return `${address.street}, ${address.ward.name}, ${address.district.name}, ${address.province.name}`;
  }
}

export const orderStatus = [
  {
    type: "ALL",
    typeName: "Tất cả",
  },
  {
    type: "PENDING",
    typeName: "Chờ xác nhận",
  },
  {
    type: "ACCEPTED",
    typeName: "Đang xử lý",
  },
  {
    type: "SHIPPING",
    typeName: "Vận chuyển",
  },
  {
    type: "COMPLETED",
    typeName: "Hoàn thành",
  },
  {
    type: "CANCELED",
    typeName: "Đã hủy",
  },
];
