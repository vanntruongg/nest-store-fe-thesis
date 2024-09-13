"use client";
import { Dispatch, SetStateAction, useCallback } from "react";

import { cn } from "~/lib/utils";

import MaxWidthWrapper from "../../../common/components/max-width-wrapper";
import CardProduct from "../../../modules/product/components/card-product";
import { ProductGet } from "~/common/model/product.model";
import ProductsPlaceHolder from "../../../common/components/skeleton/product-list-skeleton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ELayoutProduct } from "~/common/utility/enum.util";
import { GridLayout } from "../../../common/components/layout/grid-layout";
import { ListLayout } from "../../../common/components/layout/list-layout";
import { PaginationSection } from "./pagination";

interface ProductListingProps {
  layout: ELayoutProduct;
  products: ProductGet | null;
  setProducts: Dispatch<SetStateAction<ProductGet | null>>;
}

const ProductListing = ({
  products,
  layout,
  setProducts,
}: ProductListingProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleChangePage = (page: number) => {
    router.push(pathname + "?" + createQueryString("pageNo", page.toString()));
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  return (
    <MaxWidthWrapper>
      <div className="flex flex-col mb-6 py-4">
        {/* categories & products */}
        <div className={cn("")}>
          {products && products.productContent.length > 0 ? (
            layout === ELayoutProduct.GRID ? (
              <GridLayout>
                {products.productContent.map((product) => (
                  <CardProduct
                    key={product.id}
                    product={product}
                    layout={layout}
                  />
                ))}
              </GridLayout>
            ) : (
              <ListLayout>
                {products.productContent.map((product) => (
                  <CardProduct
                    key={product.id}
                    product={product}
                    layout={layout}
                  />
                ))}
              </ListLayout>
            )
          ) : (
            <ProductsPlaceHolder layout={layout} />
          )}
          {products && products.productContent.length > 0 && (
            <PaginationSection
              data={products}
              onChangePage={handleChangePage}
            />
          )}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ProductListing;
