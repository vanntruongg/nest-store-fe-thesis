import { ProductPagination } from "~/common/model/product.model";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";

export interface IPaginationSectionProps {
  data: ProductPagination;
  onChangePage: (page: number) => void;
}

const getPaginationRange = (
  currentPage: number,
  totalPages: number
): (number | string)[] => {
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
  const paginationRange = getPaginationRange(data.pageNumber, data.totalPages);
  return (
    <Pagination className="py-4">
      <PaginationContent>
        {!data.first && (
          <PaginationItem className="cursor-pointer">
            <PaginationPrevious
              title="Trước"
              onClick={() => onChangePage(data.pageNumber - 1)}
            />
          </PaginationItem>
        )}
        {paginationRange.map((page) => (
          <PaginationItem key={page} className="cursor-pointer">
            <PaginationLink
              isActive={data.pageNumber === page}
              onClick={() => typeof page === "number" && onChangePage(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {/* {Array.from({ length: data.totalPages }, (_, i) => (
          <PaginationItem key={i} className="cursor-pointer">
            <PaginationLink
              isActive={data.pageNumber - 1 === i}
              onClick={() => onChangePage(i + 1)}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))} */}
        {!data.last && (
          <PaginationItem className="cursor-pointer">
            <PaginationNext
              title="Tiếp"
              onClick={() => onChangePage(data.pageNumber + 1)}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
