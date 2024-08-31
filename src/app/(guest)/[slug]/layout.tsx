import { notFound } from "next/navigation";
import { ReactNode } from "react";
import productApi from "~/apis/product-api";
import { Product } from "~/common/model/product.model";
import { ProductUtil } from "~/common/utility/product.util";

interface Props {
  params: {
    slug: string;
  };
}
export async function generateMetadata({ params }: Props) {
  const productId = ProductUtil.extractProductIdFromSlug(params.slug);
  if (isNaN(productId)) {
    notFound();
  }

  const result = await productApi.getProductById(productId);
  const product: Product = result.payload.data;

  return {
    // title: "Chi tiết sản phẩm",
    title: product.name,
    description: `Khám phá chi tiết sản phẩm ${product.name} từ NEST Store. Hãy tìm hiểu thêm về đặc điểm, mô tả, và giá của sản phẩm để có quyết định mua hàng chính xác!`,
  };
}

export default function ShopLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
