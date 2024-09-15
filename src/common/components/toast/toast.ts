import { toast } from "../../../components/ui/use-toast";

export class Toast {
  static success(message: string, action?: any) {
    toast({
      title: "Thành công",
      description: message,
      action: action,
    });
  }
  static error(message: string, action?: any) {
    toast({
      title: "Thất bại",
      variant: "destructive",
      description: message,
      action: action,
    });
  }
}
