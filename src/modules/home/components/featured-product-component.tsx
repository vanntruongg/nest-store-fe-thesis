"use client";
import { useEffect, useState } from "react";
import FeaturedProduct from "./featured-product";
import { getListProduct } from "~/modules/product/services/ProductService";
import { Product } from "~/modules/product/models/Product";

export function FeaturedProductComponent() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getListProduct(0, "asc", 0, 12);
      setProducts(result.data.productContent);
    };
    fetchData();
  }, []);

  return (
    products && <FeaturedProduct title="Sản phẩm nổi bật" products={products} />
  );
}
