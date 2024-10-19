import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { orderStatusList } from "~/common/utility/order.util";
import { cn } from "~/lib/utils";

export function OrderStatus() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const status = searchParams.get("orderStatus") || orderStatusList[0].status;

  const handleSelectStatus = (status: string) => {
    const params = new URLSearchParams();
    params.set("orderStatus", status);
    params.set("pageNo", "1");
    router.replace(pathname + "?" + params.toString());
  };

  const renderStatus = ({
    status,
    displayName,
  }: {
    status: string;
    displayName: string;
  }) => {
    const isSelected = status === status;
    const className = isSelected
      ? "text-nowrap text-primary rounded-sm transition-all duration-200"
      : "cursor-pointer hover:text-primary";
    return (
      <div
        key={status}
        className={cn("w-full p-3 text-center text-sm font-bold", className)}
        onClick={() => handleSelectStatus(status)}
      >
        {displayName}
      </div>
    );
  };
  return (
    <div className="bg-white flex justify-between font-medium">
      {orderStatusList.map(renderStatus)}
    </div>
  );
}
