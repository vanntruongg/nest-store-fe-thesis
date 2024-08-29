import { SizeWithQuantity } from "./common.model";

interface ICategory {
  category: Category;
  subCategories?: ICategory[];
}

interface Category {
  id: number;
  name: string;
  image: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  material: string;
  style: string;
  images: ProductImage[];
  category: Category;
  categories: Category[];
  sizeQuantity: SizeWithQuantity[];
}

interface ProductImage {
  id: number;
  imageUrl: string;
}

interface ProductUpdate
  extends Omit<Product, "category" | "sizeQuantity" | "categories"> {
  categoryId: number;
}

interface ProductCreate extends Omit<Product, "id" | "category"> {
  categoryId: number;
}

interface ProductPagination {
  products: Product[];
  first: boolean;
  last: boolean;
  pageNumber: number;
  offset: number;
  totalElements: number;
  totalPages: number;
}

interface ProductReview {
  userId: string;
  productId: number;
  rating: number;
  reviewContent: string;
}

export type {
  Product,
  ProductImage,
  ICategory,
  Category,
  ProductPagination,
  ProductUpdate,
  ProductCreate,
  ProductReview,
};
