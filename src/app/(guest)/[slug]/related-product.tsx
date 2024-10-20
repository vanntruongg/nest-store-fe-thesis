import { useEffect, useState } from "react";
import MaxWidthWrapper from "../../../common/components/max-width-wrapper";
import CardProduct from "../../../modules/product/components/card-product";
import { ProductUtil } from "~/common/utility/product.util";
import { useRouter } from "next/navigation";
import { ELayoutProduct } from "~/common/utility/enum.util";
import { Product } from "~/modules/product/models/Product";
import { getProductByCategory } from "~/modules/product/services/ProductService";

export interface IRelatedProductProps {
  product: Product;
}

export function RelatedProduct({ product }: IRelatedProductProps) {
  const router = useRouter();
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProductByCategory(product.category.id, 5); // limit: 5
      setRelatedProducts(result.data);
      setRelatedProducts((preData) =>
        preData.filter((data) => data.id !== product.id)
      );
    };
    fetchData();
  }, [product.category.id, product.id]);

  const handleRedirect = () => {
    localStorage.setItem("category", product.category.name);
    router.push(
      ProductUtil.createSlugCategory(product.category.name, product.category.id)
    );
  };
  return (
    <MaxWidthWrapper className="bg-white">
      {relatedProducts.length > 0 && (
        <section className="py-12">
          <div className="md:flex md:items-center md:justify-between mb-4">
            <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Sản phẩm tương tự
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {`Các sản phẩm tương tự như ${product?.name}`}
              </p>
            </div>

            <div
              onClick={handleRedirect}
              className="hidden text-sm font-medium text-primary hover:text-purple-700 md:block cursor-pointer"
            >
              Xem danh mục {product.category.name}
              <span aria-hidden="true">&rarr;</span>
            </div>
          </div>

          <div className="relative">
            <div className="mt-6 flex items-center w-full">
              <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-5 md:gap-y-10 lg:gap-x-8">
                {relatedProducts.map((relateProduct) => (
                  <CardProduct
                    key={product.id}
                    product={relateProduct}
                    layout={ELayoutProduct.GRID}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </MaxWidthWrapper>
  );
}
