import Category from "~/modules/home/components/category";
import Slider from "~/modules/home/components/slider";
import ServiceBenefits from "~/modules/home/components/service-benefits";
import { CommingSoonProduct } from "~/modules/home/components/comming-soon-product";
import { FeaturedProductComponent } from "~/modules/home/components/featured-product-component";

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
