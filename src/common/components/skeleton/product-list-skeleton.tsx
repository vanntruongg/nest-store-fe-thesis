import { Skeleton } from "../../../components/ui/skeleton";
import { ELayoutProduct } from "~/common/utility/enum.util";
import { GridLayout } from "../layout/grid-layout";
import { ListLayout } from "../layout/list-layout";

const ProductsPlaceHolder = ({ layout }: { layout: string }) => {
  return (
    <>
      {layout === ELayoutProduct.GRID ? (
        <GridLayout>
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton className="w-full h-[200px]" />
              <div className="p-2 gap-2 flex flex-col">
                <Skeleton className="w-full h-[20px] rounded-full" />
                <Skeleton className="w-[50px] h-[18px] self-center rounded-full" />
              </div>
            </div>
          ))}
        </GridLayout>
      ) : (
        <ListLayout>
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="flex gap-2">
              <Skeleton className="w-[460px] h-[300px]" />
              <div className="p-2 py-4 gap-2 flex flex-col justify-between w-full">
                <Skeleton className="w-[500px] h-[18px] self-start rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="w-[160px] h-[20px] self-start rounded-full" />
                  <Skeleton className="w-[160px] h-[20px] self-start rounded-full" />
                </div>
                <Skeleton className="w-[100px] h-[18px] self-start rounded-full" />
                <div className="flex gap-2">
                  <Skeleton className="w-[200px] h-[40px] self-start rounded-sm" />
                  <Skeleton className="w-[40px] h-[40px] self-start" />
                  <Skeleton className="w-[40px] h-[40px] self-start" />
                </div>
              </div>
            </div>
          ))}
        </ListLayout>
      )}
      <div className="flex justify-center gap-4 my-8">
        <Skeleton className="w-20"></Skeleton>
        <Skeleton className="w-5 h-5 rounded-full"></Skeleton>
        <Skeleton className="w-5 h-5 rounded-full"></Skeleton>
        <Skeleton className="w-5 h-5 rounded-full"></Skeleton>
        <Skeleton className="w-20"></Skeleton>
      </div>
    </>
  );
};

export default ProductsPlaceHolder;
