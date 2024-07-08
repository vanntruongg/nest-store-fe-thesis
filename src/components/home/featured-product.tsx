import { Product } from "~/common/model/product.model";
import MaxWidthWrapper from "../max-width-wrapper";
import CardProduct from "../product/card-product";
import { ELayoutProduct } from "~/common/utility/enum.util";
import { GridLayout } from "../layout/grid-layout";

interface FeaturedProductProps {
  title: string;
  products: Product[];
}

const FeaturedProduct = ({ title, products }: FeaturedProductProps) => {
  return (
    <MaxWidthWrapper>
      <section className="py-12">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0 border-l-4 border-primary">
          {title ? (
            <h2 className="ml-4 text-2xl font-bold text-gray-900 sm:text-3xl">
              {title}
            </h2>
          ) : null}
        </div>

        <div className="relative">
          <div className="mt-6 flex items-center w-full">
            <GridLayout>
              {products.map((product) => (
                <CardProduct
                  key={product.id}
                  product={product}
                  layout={ELayoutProduct.GRID}
                />
              ))}
            </GridLayout>
          </div>
        </div>
      </section>
    </MaxWidthWrapper>
  );
};

export default FeaturedProduct;
