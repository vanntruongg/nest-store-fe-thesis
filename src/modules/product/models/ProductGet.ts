import { Product } from "./Product";

export type ProductGet = {
  productContent: Product[];
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
};
