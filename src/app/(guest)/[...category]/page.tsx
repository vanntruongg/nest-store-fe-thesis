"use client";
import { useEffect, useState } from "react";
import productApi from "~/apis/book-api";
import { ROUTES } from "~/common/constants/routes";
import { Product } from "~/common/model/product.model";
import Breadrumbs from "~/components/breadrumbs";
import { GridLayout } from "~/components/layout/grid-layout";
import MaxWidthWrapper from "~/components/max-width-wrapper";
import CardProduct from "~/components/product/card-product";

const ProductByCateogoryPage = ({
  params,
}: {
  params: { category: string[] };
}) => {
  const [category, id] = params.category;
  const categoryName = localStorage.getItem("category") || "";
  const [products, setProducts] = useState<Product[]>([]);
  const BREADRUMBS = [
    {
      id: 1,
      name: "Sản phẩm",
      href: ROUTES.SHOP,
    },
    {
      id: 2,
      name: categoryName,
      href: `/${category}/${id}`,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const result = await productApi.getProductByCategory(Number(id), 10);
      console.log(result);

      setProducts(result.payload.data);
    };
    fetchData();
  }, []);
  console.log(products);

  return (
    <div className="flex flex-col gap-6">
      <Breadrumbs breadrumbs={BREADRUMBS} />
      <MaxWidthWrapper>
        <GridLayout>
          {products.map((product) => (
            <CardProduct key={product.id} product={product} />
          ))}
        </GridLayout>
      </MaxWidthWrapper>
    </div>
  );
};

export default ProductByCateogoryPage;
