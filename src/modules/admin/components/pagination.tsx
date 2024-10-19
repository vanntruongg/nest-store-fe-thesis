import { Dispatch, SetStateAction } from "react";
import ReactPaginate from "react-paginate";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export interface Props {
  pageNo: number;
  setPageNo: Dispatch<SetStateAction<number>>;
  pageSize: number;
  setPageSize: Dispatch<SetStateAction<number>>;
  totalPages: number;
  totalElements: number;
}

export function Pagination({
  pageNo,
  setPageNo,
  pageSize,
  setPageSize,
  totalPages,
  totalElements,
}: Props) {
  const handleChangePageNo = ({ selected }: any) => {
    setPageNo(selected);
  };
  const handleChangePageSize = (value: string) => {
    setPageSize(Number(value));
  };

  const renderRange = () => {
    const start = pageSize * pageNo + 1;
    const end =
      pageSize * (pageNo + 1) > totalElements
        ? totalElements
        : pageSize * (pageNo + 1);

    return `Hiển thị ${start} - ${end} trên ${totalElements} kết quả`;
  };
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2 text-nowrap">
        <Select onValueChange={handleChangePageSize}>
          <SelectTrigger className="w-16 max-h-9 flex justify-center text-center">
            <SelectValue placeholder={pageSize} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="text-sm">{renderRange()}</div>
      </div>

      <ReactPaginate
        forcePage={pageNo}
        previousLabel={"Trước"}
        nextLabel={"Tiếp"}
        pageRangeDisplayed={1}
        marginPagesDisplayed={1}
        pageCount={totalPages}
        onPageChange={handleChangePageNo}
        containerClassName={"pagination-container"}
        previousClassName={"previous-btn"}
        nextClassName={"next-btn"}
        disabledClassName={"pagination-disabled"}
        activeClassName={"pagination-active"}
      />
    </div>
  );
}
