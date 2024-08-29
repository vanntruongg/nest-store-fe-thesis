import Category from "~/components/home/category";
import Slider from "~/components/home/slider";
import ServiceBenefits from "~/components/home/service-benefits";
import { CommingSoonProduct } from "~/components/home/comming-soon-product";
import { FeaturedProductComponent } from "~/components/home/featured-product-component";

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <Slider />
      <FeaturedProductComponent />
      <Category />
      <CommingSoonProduct />
      <ServiceBenefits />
    </div>
  );
}
