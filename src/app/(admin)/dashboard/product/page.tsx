"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

const TableDataAdmin = dynamic(
  () => import("~/modules/admin/components/table"),
  {
    ssr: false,
  }
);
const Pagination = dynamic(
  () => import("~/modules/admin/components/pagination"),
  {
    ssr: false,
  }
);
import useDebounce from "~/hooks/useDebounce";

import { ROUTES } from "~/common/constants/routes";
import { BaseUtil } from "~/common/utility/base.util";

import {
  getAllProduct,
  searchProductByName,
  updateProduct,
} from "~/modules/product/services/ProductService";
import { ProductGet } from "~/modules/product/models/ProductGet";
import { ProductPut } from "~/modules/product/models/ProductPut";
import { InventoryPut } from "~/modules/product/models/InventoryPut";
import { updateInventory } from "~/modules/product/services/InventoryService";

import { productTableColumns } from "./product-table-columns";
import { toast } from "~/components/ui/use-toast";
import { Input } from "~/components/ui/input";

export default function ProductManagementPage() {
  const [data, setData] = useState<ProductGet | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageNo, setPageNo] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  const debounceSearchValue = useDebounce(searchValue, 500);
  const handleSearchProduct = async () => {
    setLoading(true);
    try {
      const res = await searchProductByName(
        debounceSearchValue,
        pageNo,
        pageSize
      );
      setData(res.data);
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await getAllProduct(pageNo, pageSize);

      setData(result.data);
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debounceSearchValue !== "") {
      handleSearchProduct();
    } else {
      fetchData();
    }
  }, [debounceSearchValue, pageNo, pageSize, isUpdate]);

  const handleUpdate = async (
    updateFn: (data: any) => Promise<any>,
    data: ProductPut | InventoryPut
  ) => {
    setLoading(true);
    try {
      const result = await updateFn(data);
      setIsUpdate(!isUpdate);
      toast({ description: result.message });
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    } finally {
      setLoading(false);
    }
  };

  const columns = useMemo(() => {
    return productTableColumns(
      (productPut) => handleUpdate(updateProduct, productPut),
      (inventoryPut) => handleUpdate(updateInventory, inventoryPut)
    );
  }, []);

  return (
    <div className="space-y-4">
      {/* <div className="flex items-center justify-between"> */}
      <h2 className="text-xl font-semibold">Sản phẩm</h2>
      {/* <Link
          href={ROUTES.ADMIN.PRODUCT_CREATE}
          className="px-4 py-1.5 text-white text-sm font-medium border rounded-full bg-gradient-to-br from-purple-700 to-purple-500 hover:opacity-90"
        >
          Thêm sản phẩm
        </Link> */}
      {/* </div> */}
      <div className="flex space-x-4 items-center">
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Tìm kiếm sản phẩm..."
          required={true}
          className="max-w-72"
        />
        <Link
          href={ROUTES.ADMIN.PRODUCT_CREATE}
          className="px-4 py-1.5 text-white text-sm font-medium border rounded-full bg-gradient-to-br from-purple-700 to-purple-500 hover:opacity-90"
        >
          Thêm sản phẩm
        </Link>
      </div>
      <TableDataAdmin
        data={data?.productContent || []}
        columns={columns}
        loading={loading}
      />
      {data && (
        <Pagination
          pageNo={pageNo}
          setPageNo={setPageNo}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalPages={data.totalPages}
          totalElements={data.totalElements}
        />
      )}
    </div>
  );
}
