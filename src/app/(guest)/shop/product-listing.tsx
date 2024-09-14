"use client";
import { useCallback } from "react";

import { cn } from "~/lib/utils";

import MaxWidthWrapper from "../../../common/components/max-width-wrapper";
import CardProduct from "../../../modules/product/components/card-product";
import ProductsPlaceHolder from "../../../common/components/skeleton/product-list-skeleton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ELayoutProduct } from "~/common/utility/enum.util";
import { GridLayout } from "../../../common/components/layout/grid-layout";
import { ListLayout } from "../../../common/components/layout/list-layout";
import { ProductGet } from "~/modules/product/models/ProductGet";
import ReactPaginate from "react-paginate";

interface Props {
  layout: ELayoutProduct;
  products: ProductGet | null;
}

const ProductListing = ({ products, layout }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleChangePage = ({ selected }: any) => {
    router.push(pathname + "?" + createQueryString("pageNo", selected + 1));
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
        <div className={cn("space-y-8")}>
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
          {products && products?.totalPages && (
            <ReactPaginate
              forcePage={products.pageNo}
              previousLabel={"Trước"}
              nextLabel={"Tiếp"}
              pageRangeDisplayed={1}
              marginPagesDisplayed={1}
              pageCount={products.totalPages}
              onPageChange={handleChangePage}
              containerClassName={"pagination-container pagination-center"}
              previousClassName={"previous-btn"}
              nextClassName={"next-btn"}
              disabledClassName={"pagination-disabled"}
              activeClassName={"pagination-active"}
            />
          )}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ProductListing;
