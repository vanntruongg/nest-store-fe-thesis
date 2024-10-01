"use client";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

import { BaseUtil } from "~/common/utility/base.util";
import {
  getAllProduct,
  updateProduct,
} from "~/modules/product/services/ProductService";
import { ProductGet } from "~/modules/product/models/ProductGet";
import { ProductPut } from "~/modules/product/models/ProductPut";
import { toast } from "~/components/ui/use-toast";
import { ROUTES } from "~/common/constants/routes";
import Link from "next/link";
import { InventoryPut } from "~/modules/product/models/InventoryPut";
import { updateInventory } from "~/modules/product/services/InventoryService";
import Loading from "~/common/components/loading";
import { Pagination } from "~/modules/admin/components/pagination";
import { productTableColumns } from "./product-table-columns";
import { TableDataAdmin } from "~/modules/admin/components/table";

export default function ProductManagementPage() {
  const [data, setData] = useState<ProductGet | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageNo, setPageNo] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  useEffect(() => {
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
    fetchData();
  }, [pageNo, pageSize, isUpdate]);

  const handleUpdateProduct = async (productPut: ProductPut) => {
    setLoading(true);
    try {
      const result = await updateProduct(productPut);
      setIsUpdate(!isUpdate);
      toast({ description: result.message });
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateInventory = async (inventoryPut: InventoryPut) => {
    setLoading(true);
    try {
      const result = await updateInventory(inventoryPut);
      setIsUpdate(!isUpdate);
      toast({ description: result.message });
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    } finally {
      setLoading(false);
    }
  };

  const columns = productTableColumns(
    handleUpdateProduct,
    handleUpdateInventory
  );

  return (
    <div className="space-y-4">
      {loading && <Loading />}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Sản phẩm</h2>
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
