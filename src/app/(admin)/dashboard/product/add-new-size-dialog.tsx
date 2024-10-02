import { Plus } from "lucide-react";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export interface Props {
  sizes: string[];
  setSizes: Dispatch<SetStateAction<string[]>>;
}

export function AddNewSize({ sizes, setSizes }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [newSize, setNewSize] = useState<string>("");
  const [error, setError] = useState<Record<string, boolean | string>>({
    valid: false,
    message: "",
  });
  const handleAddSize = () => {
    if (newSize === "") {
      setError({ valid: true, message: "  Vui lòng nhập phân loại" });
      return;
    }
    if (sizes.includes(newSize.toUpperCase())) {
      setError({ valid: true, message: "  Phân loại đã có sẵn" });
      return;
    }
    setOpen(false);
    const newSizes = [...sizes, newSize];
    setSizes(newSizes);
    localStorage.setItem("sizes", JSON.stringify(newSizes));
  };

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setError({ valid: true, message: "  Vui lòng nhập phân loại" });
    } else {
      setError({ valid: false, message: "  " });
    }
    setNewSize(e.target.value);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={"outline"} className="p-2 h-8 text-xs">
          <Plus strokeWidth={1.5} size={18} />
          Thêm phân loại
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Thêm phân loại khác</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="space-y-2">
          <Input
            value={newSize}
            onChange={handleChangeValue}
            placeholder="Nhập phân loại khác"
          />
          {error.valid && (
            <span className="text-red-500 text-sm">{error.message}</span>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <Button onClick={handleAddSize}> Xác nhận</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
