import MaxWidthWrapper from "../max-width-wrapper";
import { Skeleton } from "../../../components/ui/skeleton";

export const ProductDetailPlaceholder = () => {
  return (
    <MaxWidthWrapper>
      <div className="bg-white flex gap-8 p-10 rounded-sm">
        <div className="w-full grid grid-cols-10 gap-2">
          <Skeleton className="col-span-8 aspect-square bg-gray-200 relative" />
        </div>
        <div className="w-full flex flex-col space-y-6">
          <div className="space-y-1">
            <Skeleton className="bg-gray-200 w-full h-8" />
            <Skeleton className="bg-gray-200 w-2/3 h-8" />
          </div>
          <Skeleton className="bg-gray-200 w-2/3 h-8" />

          <Skeleton className="bg-gray-200 w-2/3 h-6" />
          <div className="grid grid-cols-10 items-center py-2">
            <div className="col-span-2">
              <Skeleton className="bg-gray-200 w-16 h-8" />
            </div>
            <div className="col-span-8 flex space-x-4">
              <Skeleton className="bg-gray-200 w-20 h-8" />
              <Skeleton className="bg-gray-200 w-20 h-8" />
              <Skeleton className="bg-gray-200 w-20 h-8" />
              <Skeleton className="bg-gray-200 w-20 h-8" />
            </div>
          </div>
          <div className="grid grid-cols-10 items-center">
            <div className="col-span-2">
              <Skeleton className="bg-gray-200 w-16 h-6" />
            </div>
            <div className="col-span-8">
              <Skeleton className="bg-gray-200 w-32 h-16" />
            </div>
          </div>

          <div className="flex gap-4">
            <Skeleton className="flex-1 bg-gray-200 h-10" />
            <Skeleton className="flex-1 bg-gray-200 h-10" />
            <Skeleton className="bg-gray-200 w-10 h-10" />
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};
