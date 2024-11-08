import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { ProductUtil } from "~/common/utility/product.util";
import { Product } from "~/modules/product/models/Product";
import { getProductById } from "~/modules/product/services/ProductService";

interface Props {
  params: {
    slug: string;
  };
}
export async function generateMetadata({ params }: Props) {
  // const productId = ProductUtil.extractProductIdFromSlug(params.slug);
  // if (isNaN(productId)) {
  //   notFound();
  // }

  // const result = await getProductById(productId);
  // const product: Product = result.data;

  return {
    title: "Chi tiết sản phẩm",
    // title: product.name,
    description: `Khám phá chi tiết sản phẩm từ NEST Store. Hãy tìm hiểu thêm về đặc điểm, mô tả, và giá của sản phẩm để có quyết định mua hàng chính xác!`,
  };
}

export default function ShopLayout({ children }: { children: ReactNode }) {
  return <div className="bg-gray-100">{children}</div>;
}
