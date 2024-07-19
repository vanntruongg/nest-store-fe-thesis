import Image from "next/image";
import MaxWidthWrapper from "../max-width-wrapper";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface ICommingSoonProductProps {}

export function CommingSoonProduct(props: ICommingSoonProductProps) {
  return (
    <MaxWidthWrapper className="">
      <div className="relative w-full min-h-[500px] overflow-hidden bg-red-500">
        <div className="absolute w-full h-full ">
          <Image
            alt="background image"
            src="/assets/winter-collections.jpg"
            width={400}
            height={400}
            className="w-full h-full"
          />
        </div>
        <div className="p-10 md:p-20 md:w-1/2 absolute bottom-0 top-0 flex flex-col justify-center gap-10">
          <h4 className="text-5xl font-semibold">
            Đón chờ bộ sưu tập mùa đông
          </h4>
          <p className="text-gray-500">
            Giảm giá lên đến <span className="text-xl font-bold">32%</span>, gọi
            ngay cho chúng tôi!
          </p>
          <Link
            href={"/shop"}
            className="self-start px-4 py-2 flex gap-1 bg-white font-semibold hover:bg-primary hover:text-white shadow transition-all duration-200"
          >
            Mua ngay
            <ArrowRight strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
