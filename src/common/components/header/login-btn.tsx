import Link from "next/link";
import { ROUTES } from "~/common/constants/routes";

export function ButtonLogin() {
  return (
    <Link
      href={ROUTES.AUTH.LOGIN}
      className="px-3 py-1.5 ml-4 font-semibold text-primary hover:text-white border border-primary rounded-md relative group overflow-hidden transition-all duration-500"
    >
      <span>Đăng nhập</span>
      <span className="absolute top-0 left-0 -rotate-[360deg] h-0 w-0 bg-primary group-hover:-translate-y-10 group-hover:-translate-x-10 transition-all duration-500 -z-10 group-hover:h-[180px] group-hover:w-[180px] rounded-full"></span>
    </Link>
  );
}
