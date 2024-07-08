"use client";
import { Dispatch, SetStateAction, useCallback } from "react";

import { cn } from "~/lib/utils";

import MaxWidthWrapper from "../../../components/max-width-wrapper";
import CardProduct from "../../../components/product/card-product";
import { ProductPagination } from "~/common/model/product.model";
import ProductsPlaceHolder from "../../../components/skeleton/ProductListSkeleton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ELayoutProduct } from "~/common/utility/enum.util";
import { GridLayout } from "../../../components/layout/grid-layout";
import { ListLayout } from "../../../components/layout/list-layout";
import { PaginationSection } from "./pagination";

interface ProductListingProps {
  layout: ELayoutProduct;
  data: ProductPagination;
  setData: Dispatch<SetStateAction<ProductPagination>>;
}

const ProductListing = ({ data, layout, setData }: ProductListingProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleChangePage = (page: number) => {
    setData((prevData) => ({ ...prevData, pageNumber: page }));
    router.push(
      pathname + "?" + createQueryString("pageNumber", page.toString())
    );
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
      <div className="flex flex-col mb-6">
        {/* categories & products */}
        <div className={cn("")}>
          {data.products.length > 0 ? (
            layout === ELayoutProduct.GRID ? (
              <GridLayout>
                {data.products.map((product) => (
                  <CardProduct
                    key={product.id}
                    product={product}
                    layout={layout}
                  />
                ))}
              </GridLayout>
            ) : (
              <ListLayout>
                {data.products.map((product) => (
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
          {data.products.length > 0 && (
            <PaginationSection data={data} onChangePage={handleChangePage} />
          )}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ProductListing;
