import { Product } from "./Product";

export type ProductsGet = {
  productContent: Product[];
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
};
