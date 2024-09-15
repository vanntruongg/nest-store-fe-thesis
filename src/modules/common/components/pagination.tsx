import ReactPaginate from "react-paginate";
import { cn } from "~/lib/utils";

export interface IProps {
  pageNo: number;
  totalPages: number;
  className?: string;
  handleChangePage: (selected: any) => void;
}

export function Pagination({
  pageNo,
  totalPages,
  className,
  handleChangePage,
}: IProps) {
  return (
    <ReactPaginate
      forcePage={pageNo}
      previousLabel={"Trước"}
      nextLabel={"Tiếp"}
      pageRangeDisplayed={1}
      marginPagesDisplayed={1}
      pageCount={totalPages}
      onPageChange={handleChangePage}
      containerClassName={cn("pagination-container", className)}
      previousClassName={"previous-btn"}
      nextClassName={"next-btn"}
      disabledClassName={"pagination-disabled"}
      activeClassName={"pagination-active"}
    />
  );
}
