import productApi from "~/apis/product-api";
import { ProductUtil } from "~/common/utility/product.util";

export const getProductById = async (slug: string) => {
  const productId = ProductUtil.extractProductIdFromSlug(slug);
  const res = await productApi.getProductById(productId);
  return res.payload.data;
};
