interface Book {
  id: string;
  title: string;
  price: number;
  author: Author;
  stock: number;
  language: string;
  publisher: string;
  imageUrls: string[];
  description: string;
  categories: Category[];
}

interface Author {
  id: string;
  name: string;
  biography: string;
}

interface Category {
  id: string;
  category: string;
  categories: Category[];
}
