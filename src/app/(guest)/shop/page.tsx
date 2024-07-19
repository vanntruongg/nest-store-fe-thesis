"use client";
import MaxWidthWrapper from "~/components/max-width-wrapper";
import Breadrumbs from "~/components/breadrumbs";
import ProductListing from "~/app/(guest)/shop/product-listing";
import { cn } from "~/lib/utils";
import ListCategory from "~/app/(guest)/shop/list-category";

import { ShopToolBar } from "./shop-toolbar";
import { useEffect, useState } from "react";
import { ELayoutProduct } from "~/common/utility/enum.util";
import { useSearchParams } from "next/navigation";
import { ProductPagination } from "~/common/model/product.model";
import productApi from "~/apis/book-api";
import { BaseUtil } from "~/common/utility/base.util";
import { ROUTES } from "~/common/constants/routes";

const BREADRUMBS = [
  {
    id: 1,
    name: "Sản phẩm",
    href: ROUTES.SHOP,
  },
];

export default function ShopPage() {
  const searchParams = useSearchParams();
  const [layout, setLayout] = useState<ELayoutProduct>(ELayoutProduct.GRID);
  const [data, setData] = useState<ProductPagination>({
    products: [],
    first: false,
    last: false,
    pageNumber: 1,
    offset: 0,
    totalElements: 0,
    totalPages: 0,
  });

  const pageSize = Number(searchParams.get("pageSize"));
  useEffect(() => {
    const fetchData = async () => {
      try {
        const order = searchParams.get("order") || "";
        const pageNo = Number(searchParams.get("pageNumber"));
        const category = Number(searchParams.get("category")) || 0;

        const result = await productApi.getList(
          category,
          order,
          pageNo,
          pageSize
        );

        setData({
          products: result.payload.data.content || [],
          first: result.payload.data.first,
          last: result.payload.data.last,
          pageNumber: result.payload.data.pageable.pageNumber + 1 || 0,
          offset: result.payload.data.pageable.offset,
          totalElements: result.payload.data.totalElements,
          totalPages: result.payload.data.totalPages,
        });

        // if (categoryId) {
        //   const categoryResult = await productApi.getAllSubCategory(categoryId);
        //   // console.log("categoryResult", categoryResult);
        //   setCategories(categoryResult.payload.data);
        // }
      } catch (error) {
        BaseUtil.handleErrorApi({ error });
      }
    };

    fetchData();
  }, [searchParams, data.pageNumber, pageSize]);

  return (
    <div className="flex flex-col gap-6 mb-6">
      <Breadrumbs breadrumbs={BREADRUMBS} />
      <ShopToolBar
        offset={data.offset}
        totalElements={data.totalElements}
        layout={layout}
        setLayout={setLayout}
      />
      <MaxWidthWrapper>
        <div className={cn("grid grid-cols-5 gap-6")}>
          <ListCategory />
          <div className="bg-white col-span-4">
            <ProductListing layout={layout} data={data} setData={setData} />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
