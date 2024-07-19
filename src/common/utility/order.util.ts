import { format, parseISO } from "date-fns";

export class OrderUtil {
  static formatDate(createDate: string) {
    return format(parseISO(createDate), "dd/MM/yyyy HH:mm:ss");
  }
}
