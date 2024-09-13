"use client";
import MaxWidthWrapper from "~/common/components/max-width-wrapper";
import Breadrumbs from "~/common/components/breadrumbs";
import ProductListing from "~/app/(guest)/shop/product-listing";
import { cn } from "~/lib/utils";
import ListCategory from "~/app/(guest)/shop/list-category";

import { ShopToolBar } from "./shop-toolbar";
import { useEffect, useState } from "react";
import { ELayoutProduct } from "~/common/utility/enum.util";
import { useSearchParams } from "next/navigation";
import productApi from "~/apis/product-api";
import { BaseUtil } from "~/common/utility/base.util";
import { ROUTES } from "~/common/constants/routes";
import { ProductsGet } from "~/modules/product/models/ProductGet";

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
  const [productGet, setProductGet] = useState<ProductsGet | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const category = Number(searchParams.get("category")) || 0;
        const pageSize = Number(searchParams.get("pageSize"));
        const pageNo = Number(searchParams.get("pageNo"));
        const sortOrder = searchParams.get("sortOrder") || "";

        const res = await productApi.getList(
          category,
          sortOrder,
          pageNo,
          pageSize
        );

        setProductGet(res.payload.data);
      } catch (error) {
        BaseUtil.handleErrorApi({ error });
      }
    };

    fetchData();
  }, [searchParams]);

  return (
    <div className="flex flex-col gap-6 mb-6">
      <Breadrumbs breadrumbs={BREADRUMBS} context="page" />
      {productGet && (
        <ShopToolBar
          offset={productGet.pageNo}
          totalElements={productGet?.totalElements}
          layout={layout}
          setLayout={setLayout}
        />
      )}
      <MaxWidthWrapper>
        <div className={cn("grid grid-cols-5 gap-6")}>
          <ListCategory />
          <div className="bg-white col-span-4">
            <ProductListing
              layout={layout}
              products={productGet}
              setProducts={setProductGet}
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
