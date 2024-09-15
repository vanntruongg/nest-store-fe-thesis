import { Skeleton } from "../../../components/ui/skeleton";

const AddressPlaholder = () => {
  return (
    <div className="divide-y">
      <div className="w-full py-5 flex justify-between">
        <div className="flex flex-col space-y-1">
          <div className="flex items-center gap-2">
            <Skeleton className="pr-2 w-20 h-6"></Skeleton>
            <span className="w-[1.5px] h-6 bg-gray-100 rounded-md"></span>
            <Skeleton className="pl-2 w-28 h-6"></Skeleton>
          </div>
          <Skeleton className="w-28 h-5 rounded-md"></Skeleton>
          <Skeleton className="w-72 h-5 rounded-md"></Skeleton>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-end gap-2">
            <Skeleton className="w-14 h-5 rounded-md"></Skeleton>
            <Skeleton className="w-8 h-5 rounded-md"></Skeleton>
          </div>
          <Skeleton className="w-36 self-end h-10 rounded-md"></Skeleton>
        </div>
      </div>
      <div className="w-full py-5 flex justify-between">
        <div className="flex flex-col space-y-1">
          <div className="flex items-center gap-2">
            <Skeleton className="pr-2 w-20 h-6"></Skeleton>
            <span className="w-[1.5px] h-6 bg-gray-100 rounded-md"></span>
            <Skeleton className="pl-2 w-28 h-6"></Skeleton>
          </div>
          <Skeleton className="w-28 h-5 rounded-md"></Skeleton>
          <Skeleton className="w-72 h-5 rounded-md"></Skeleton>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-end gap-2">
            <Skeleton className="w-14 h-5 rounded-md"></Skeleton>
            <Skeleton className="w-8 h-5 rounded-md"></Skeleton>
          </div>
          <Skeleton className="w-36 self-end h-10 rounded-md"></Skeleton>
        </div>
      </div>
    </div>
  );
};

export default AddressPlaholder;
