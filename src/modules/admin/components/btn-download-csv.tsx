import { Button } from "~/components/ui/button";
import { BaseUtil } from "~/common/utility/base.util";
import { tokenStorage } from "~/common/utility/auth/token-storage";
import { toast } from "~/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "~/components/ui/dialog";
import { Download, Info } from "lucide-react";
import { useState } from "react";

interface Props {
  endpoint: string;
}

export function ButtonDownloadCSV({ endpoint }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const downloadCSV = async () => {
    try {
      const token = tokenStorage.value.rawToken.accessToken;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const res = await fetch(
        `http://localhost:9000/api/v1/order/statistic/${endpoint}`,
        {
          method: "GET",
          headers: headers,
        }
      );

      if (!res.ok) {
        toast({
          description: "Failed to download file",
          variant: "destructive",
        });
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "orders.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
      setOpen(false);
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="flex gap-1 items-center ">
          <Download strokeWidth={1.5} size={18} className="-mt-1" />
          <span className="">Tải xuống CSV</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex gap-1 items-center">
            <Info size={20} className="text-blue-500" />
            <p>Tải xuống báo cáo thống kê đơn hàng</p>
          </DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn tải xuống báo cáo thống kê đơn hàng dưới dạng
            tệp CSV không? Báo cáo này sẽ giúp bạn phân tích số liệu đơn hàng
            theo tháng.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={downloadCSV}>Xác nhận tải xuống</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
