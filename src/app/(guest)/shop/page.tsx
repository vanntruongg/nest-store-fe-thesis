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
import { BaseUtil } from "~/common/utility/base.util";
import { ROUTES } from "~/common/constants/routes";
import { ProductGet } from "~/modules/product/models/ProductGet";
import { getListProduct } from "~/modules/product/services/ProductService";

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
  const [productGet, setProductGet] = useState<ProductGet | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const category = Number(searchParams.get("category")) || 0;
        const pageSize = Number(searchParams.get("pageSize"));
        const pageNo = Number(searchParams.get("pageNo"));
        const sortOrder = searchParams.get("sortOrder") || "";

        const res = await getListProduct(category, sortOrder, pageNo, pageSize);

        setProductGet(res.data);
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
            <ProductListing layout={layout} products={productGet} />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
