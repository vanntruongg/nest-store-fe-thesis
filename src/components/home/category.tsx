import MaxWidthWrapper from "../max-width-wrapper";
import Image from "next/image";
import CategoryMen from "../../../public/assets/category-man.jpg";
import CategoryWomen from "../../../public/assets/category-women.jpg";
import Link from "next/link";

const categories = [
  {
    id: 1,
    category: "Thời Trang Nam",
    image: CategoryMen,
  },
  {
    id: 2,
    category: "Thời Trang Nữ",
    image: CategoryWomen,
  },
  {
    id: 3,
    category: "Nam và Nữ",
    image: CategoryWomen,
  },
];
const Category = () => {
  return (
    <MaxWidthWrapper>
      <div className="flex flex-col justify-center gap-12 py-16">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0 border-l-4 border-primary">
          <h2 className="ml-4 text-2xl font-bold text-gray-900 sm:text-3xl">
            Danh mục sản phẩm
          </h2>
        </div>
        {/* <div className="mx-auto size-full flex flex-col md:flex-row lg:flex-row gap-4"> */}
        <div className="mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((categories) => (
            <div
              key={categories.id}
              className="mx-auto relative group overflow-hidden"
            >
              <Image
                src={categories.image}
                alt={`category-${categories.category}`}
                className="group-hover:scale-110 transition-all duration-300"
              />
              <p className="absolute top-5 left-5 text-2xl font-bold group-hover:text-primary transition-all duration-300">
                {categories.category}
              </p>
              <Link
                href={"/shop"}
                className="absolute bottom-5 left-5 px-6 py-3 font-bold border hover:bg-gray-900 hover:text-white transition-all duration-300"
              >
                Mua ngay
              </Link>
            </div>
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Category;
