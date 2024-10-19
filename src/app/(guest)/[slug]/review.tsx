import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import Image from "next/image";
import { useState } from "react";
import { cn } from "~/lib/utils";

const filterOptions: {
  label: string;
  value: string | number;
  count: number;
}[] = [
  {
    label: "Tất cả",
    value: "all",
    count: 40,
  },
  {
    label: "5 sao",
    value: 5,
    count: 20,
  },
  {
    label: "4 sao",
    value: 4,
    count: 10,
  },
  {
    label: "3 sao",
    value: 3,
    count: 6,
  },
  {
    label: "2 sao",
    value: 2,
    count: 3,
  },
  {
    label: "1 sao",
    value: 1,
    count: 1,
  },
];

const reviews = [
  {
    id: 1,
    avatar:
      "https://img.freepik.com/free-photo/cute-smiling-young-man-with-bristle-looking-satisfied_176420-18989.jpg?t=st=1718187081~exp=1718190681~hmac=80311aa1cbc7de41e582409c7116c98dbe3dd3235d359eaa65fdab14906bf0da&w=900",
    userName: "Văn Trường",
    rating: 3,
    createAt: "2024-05-26 18:10 ",
    material: "đẹp, giống quảng cáo",
    color: "đen",
    matchesDescription: "đúng nha",
    content:
      "mặc nên form đẹp lắm mọi người nên mua nha mình mua luôn 2 màu thấy ưng quá trời.",
    images: [""],
  },
  {
    id: 2,
    avatar:
      "https://img.freepik.com/free-photo/cute-smiling-young-man-with-bristle-looking-satisfied_176420-18989.jpg?t=st=1718187081~exp=1718190681~hmac=80311aa1cbc7de41e582409c7116c98dbe3dd3235d359eaa65fdab14906bf0da&w=900",
    userName: "Văn Trường",
    rating: 5,
    createAt: "2024-05-26 18:10 ",
    material: "đẹp, giống quảng cáo",
    color: "đen",
    matchesDescription: "đúng nha",
    content:
      "mặc nên form đẹp lắm mọi người nên mua nha mình mua luôn 2 màu thấy ưng quá trời.",
    images: [""],
  },
  {
    id: 3,
    avatar:
      "https://img.freepik.com/free-photo/cute-smiling-young-man-with-bristle-looking-satisfied_176420-18989.jpg?t=st=1718187081~exp=1718190681~hmac=80311aa1cbc7de41e582409c7116c98dbe3dd3235d359eaa65fdab14906bf0da&w=900",
    userName: "Văn Trường",
    rating: 2,
    createAt: "2024-05-26 18:10 ",
    material: "đẹp, giống quảng cáo",
    color: "đen",
    matchesDescription: "đúng nha",
    content:
      "mặc nên form đẹp lắm mọi người nên mua nha mình mua luôn 2 màu thấy ưng quá trời.",
    images: [""],
  },
  {
    id: 4,
    avatar:
      "https://img.freepik.com/free-photo/cute-smiling-young-man-with-bristle-looking-satisfied_176420-18989.jpg?t=st=1718187081~exp=1718190681~hmac=80311aa1cbc7de41e582409c7116c98dbe3dd3235d359eaa65fdab14906bf0da&w=900",
    userName: "Văn Trường",
    rating: 1,
    createAt: "2024-05-26 18:10 ",
    material: "đẹp, giống quảng cáo",
    color: "đen",
    matchesDescription: "đúng nha",
    content:
      "mặc nên form đẹp lắm mọi người nên mua nha mình mua luôn 2 màu thấy ưng quá trời.",
    images: [""],
  },
];

export function Review() {
  const [filterValue, setFilterValue] = useState<string | number>(
    filterOptions[0].value
  );
  const handleFilterReview = (value: string | number) => {
    setFilterValue(value);
  };
  return (
    <div className="flex flex-col gap-4 p-4 bg-white">
      <div className="p-8 px-16 flex gap-16 bg-purple-50 bg-opacity-50 border border-purple-100">
        <h3 className="text-xl">Đánh giá sản phẩm</h3>
        {/* <div className="">
          <p className="text-2xl">
            5.0 <span className="text-base">trên 5</span>
          </p>
          <div className="flex text-yellow-500">
            <IoIosStar />
            <IoIosStar />
            <IoIosStar />
            <IoIosStar />
            <IoIosStar />
          </div>
        </div> */}
        <div className="flex gap-2">
          {filterOptions.map((option) => (
            <div
              key={option.value}
              onClick={() => handleFilterReview(option.value)}
              className={cn(
                "self-start px-4 py-1 text-nowrap text-sm border cursor-pointer",
                {
                  "border-primary text-primary": option.value === filterValue,
                }
              )}
            >
              {option.label} {`(${option.count})`}
            </div>
          ))}
        </div>
      </div>
      <div className="px-10 divide-y">
        {reviews.map((review) => (
          <div key={review.id} className="py-4 flex gap-2">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Image
                src={review.avatar}
                alt="avatar user"
                width={100}
                height={100}
                className="w-full h-full"
              />
            </div>
            <div className="flex flex-col space-y-4">
              <div className="text-xs space-y-1.5">
                <h5 className="">{review.userName}</h5>
                {/*  */}
                <div className="flex gap-0.5 text-base text-yellow-500">
                  {Array.from({ length: 5 }, (_, idx) =>
                    idx + 1 <= review.rating ? (
                      <IoIosStar key={idx} />
                    ) : (
                      <IoIosStarOutline key={idx} />
                    )
                  )}
                </div>
                <div className="text-muted-foreground">{review.createAt}</div>
              </div>
              <div className="text-sm space-y-1.5">
                <div className="flex gap-1 text-muted-foreground">
                  Chất liệu:
                  <span className="text-black">{review.material}</span>
                </div>
                <div className="flex gap-1 text-muted-foreground">
                  Màu sắc:
                  <span className="text-black">{review.color}</span>
                </div>
                <div className="flex gap-1 text-muted-foreground">
                  Đúng với mô tả:
                  <span className="text-black">
                    {review.matchesDescription}
                  </span>
                </div>
              </div>
              <p className="text-sm font-medium">{review.content}</p>
              <div className=""></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
