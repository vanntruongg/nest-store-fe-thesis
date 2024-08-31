"use client";
import { useEffect, useState } from "react";
import productApi from "~/apis/product-api";
import { Category, Product } from "~/common/model/product.model";
import { BaseUtil } from "~/common/utility/base.util";
import { ProductUtil } from "~/common/utility/product.util";
import Breadrumbs from "~/components/breadrumbs";
import MaxWidthWrapper from "~/components/max-width-wrapper";
import ProductDetail from "~/components/product-detail/product-detail";
import { Breadrumb } from "~/common/model/base.model";
import { ROUTES } from "~/common/constants/routes";

interface ProductDetailPageProps {
  params: {
    slug: string;
  };
}

const ProductDetailPage = ({ params }: ProductDetailPageProps) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const { slug } = params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await productApi.getProductById(
          ProductUtil.extractProductIdFromSlug(params.slug)
        );

        const { categories, ...product } = result.payload.data;

        setProduct(product);
        setCategories(categories);
      } catch (error) {
        BaseUtil.handleErrorApi({ error });
      }
    };
    fetchData();
  }, [params.slug]);

  const breadcrumbs: Breadrumb[] = [];
  categories.map((category) => {
    breadcrumbs.unshift({
      id: category.id,
      name: category.name,
      href: ROUTES.SHOP + `?category=${category.id}`,
    });
  });

  return (
    <div className="bg-gray-100 flex flex-col space-y-4 mb-4">
      <Breadrumbs
        breadrumbs={breadcrumbs}
        options={product?.name}
        optionPage={true}
      />
      <ProductDetail product={product!} />

      <MaxWidthWrapper className="space-y-4">
        <div className="bg-white p-4">
          <h3 className="text-xl">Chi tiết sản phẩm</h3>
          <div className="py-8 flex flex-col gap-2 text-sm">
            <div className="flex gap-2 items-center">
              <span className="text-muted-foreground">Danh mục:</span>
              <Breadrumbs
                breadrumbs={breadcrumbs}
                className="-translate-x-10 h-4 bg-transparent"
              />
            </div>
            <div className="flex gap-2">
              <span className="text-muted-foreground">Chất liệu:</span>
              <p>{product?.material}</p>
            </div>
            <div className="flex gap-2">
              <span className="text-muted-foreground">Phong cách:</span>
              <p>{product?.style}</p>
            </div>
          </div>
          {/* <div className="bg-gray-100">
            <DevelopingTooltip>
              <h2 className="text-xl p-2">Đánh giá sản phẩm</h2>
            </DevelopingTooltip>
          </div> */}
        </div>
        {/* <Review
          review={{ userId: "", productId: 5, rating: 5, reviewContent: "" }}
        /> */}
      </MaxWidthWrapper>
      {/* <MaxWidthWrapper>
        {product ? <RelatedProduct product={product} /> : <></>}
      </MaxWidthWrapper> */}
    </div>
  );
};

export default ProductDetailPage;
