import { ProductGet } from "~/common/model/product.model";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/common/components/ui/pagination";

export interface IPaginationSectionProps {
  data: ProductGet;
  onChangePage: (page: number) => void;
}

const getPaginationRange = (
  currentPage: number,
  totalPages: number
): (number | string)[] => {
  if (totalPages === 1) {
    return [1];
  }
  const delta = 2; // số lượng trang hiển thị mỗi bên của trang hiện tại
  const range: (number | string)[] = [];
  const left = Math.max(2, currentPage - delta);
  const right = Math.min(totalPages - 1, currentPage + delta);

  range.push(1);
  if (left > 2) range.push("...");

  for (let i = left; i <= right; i++) {
    range.push(i);
  }

  if (right < totalPages - 1) range.push("...");

  range.push(totalPages);

  return range;
};

export function PaginationSection({
  data,
  onChangePage,
}: IPaginationSectionProps) {
  const paginationRange = getPaginationRange(data.pageNo, data.totalPages);
  return (
    <Pagination className="py-4">
      <PaginationContent>
        {data.pageNo !== 0 && (
          <PaginationItem className="cursor-pointer">
            <PaginationPrevious
              title="Trước"
              onClick={() => onChangePage(data.pageNo)}
            />
          </PaginationItem>
        )}
        {paginationRange.map((page) => (
          <PaginationItem key={page} className="cursor-pointer">
            <PaginationLink
              isActive={data.pageNo + 1 === page}
              onClick={() => typeof page === "number" && onChangePage(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {!data.isLast && (
          <PaginationItem className="cursor-pointer">
            <PaginationNext
              title="Tiếp"
              onClick={() => onChangePage(data.pageNo + 2)}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
