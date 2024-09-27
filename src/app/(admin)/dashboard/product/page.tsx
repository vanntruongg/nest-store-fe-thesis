"use client";
import { useEffect, useState } from "react";
import { ProductsTable } from "./products-table";
import {
  getAllProduct,
  updateProduct,
} from "~/modules/product/services/ProductService";
import { BaseUtil } from "~/common/utility/base.util";
import { ProductPut } from "~/modules/product/models/ProductPut";
import { toast } from "~/components/ui/use-toast";
import { ProductGet } from "~/modules/product/models/ProductGet";
import ReactPaginate from "react-paginate";

export default function ProductManagementPage() {
  const [data, setData] = useState<ProductGet | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageNo, setPageNo] = useState<number>(0);
  const pageSize = 5;

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
  }, [pageNo]);

  const handleUpdateProduct = async (productPut: ProductPut) => {
    try {
      const result = await updateProduct(productPut);
      toast({ description: result.message });
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    } finally {
      setLoading(false);
    }
  };
  // console.log(data);

  const handleChangePage = ({ selected }: any) => {
    setPageNo(selected);
  };

  return (
    <>
      <ProductsTable
        data={data}
        pageSize={pageSize}
        loading={loading}
        setLoading={setLoading}
        updateProduct={handleUpdateProduct}
      />

      {data && data?.totalPages && (
        <ReactPaginate
          forcePage={data.pageNo}
          previousLabel={"Trước"}
          nextLabel={"Tiếp"}
          pageRangeDisplayed={1}
          marginPagesDisplayed={1}
          pageCount={data.totalPages}
          onPageChange={handleChangePage}
          containerClassName={"pagination-container pagination-center"}
          previousClassName={"previous-btn"}
          nextClassName={"next-btn"}
          disabledClassName={"pagination-disabled"}
          activeClassName={"pagination-active"}
        />
      )}
    </>
  );
}
