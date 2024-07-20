import { Skeleton } from "../ui/skeleton";

export function ItemCartPlaceholder() {
  return (
    <div className="w-full grid grid-cols-6 gap-4 py-6 sm:py-10">
      <div className="col-span-3 flex flex-1 gap-4">
        <Skeleton className="w-24 h-24" />
        <Skeleton className="w-96 h-5" />
      </div>
      <div className="col-span-3 flex flex-1 items-center justify-between">
        <div className="flex justify-center items-center w-full">
          <Skeleton className="w-20 h-5" />
        </div>
        <div className="flex justify-center items-center w-full">
          <Skeleton className="w-5 h-5" />
        </div>
        <div className="flex justify-center items-center w-full">
          <Skeleton className="w-20 h-5" />
        </div>
      </div>
    </div>
  );
}
