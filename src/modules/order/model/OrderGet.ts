import { Order } from "./Order";

export type OrderGet = {
  orderList: Order[];
  totalElements: number;
  totalPages: number;
  isLast: boolean;
};
