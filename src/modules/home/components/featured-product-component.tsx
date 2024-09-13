"use client";
import { useEffect, useState } from "react";
import FeaturedProduct from "./featured-product";
import { Product } from "~/common/model/product.model";
import productApi from "~/apis/product-api";

export function FeaturedProductComponent() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await productApi.getList(0, "asc", 0, 12);
      setProducts(result.payload.data.productContent);
    };
    fetchData();
  }, []);

  return (
    products && <FeaturedProduct title="Sản phẩm nổi bật" products={products} />
  );
}
