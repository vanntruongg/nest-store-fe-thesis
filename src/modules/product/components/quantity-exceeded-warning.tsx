import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/common/components/ui/alert-dialog";

export interface IQuantityExceededWarningProps {
  open: boolean;
  setOpen: (isShow: boolean) => void;
}

export function QuantityExceededWarning({
  open,
  setOpen,
}: IQuantityExceededWarningProps) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="min-h-60 flex flex-col justify-between select-none">
        <AlertDialogHeader>
          <AlertDialogTitle>Thông báo</AlertDialogTitle>
          <AlertDialogDescription>
            Số lượng bạn thêm vào giỏ hàng đã đạt mức tối đa số lượng của sản
            phẩm này.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="justify-end">
          <AlertDialogAction className="w-full">OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
