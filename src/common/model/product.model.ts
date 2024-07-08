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
  material?: string;
  style?: string;
  imageUrl: string;
  stock: number;
  category: Category;
}

interface ProductUpdate extends Omit<Product, "category"> {
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
  ICategory,
  Category,
  ProductPagination,
  ProductUpdate,
  ProductCreate,
  ProductReview,
};
