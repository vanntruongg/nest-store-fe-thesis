export type Category = {
  id: number;
  name: string;
  image: string;
  subCategories: Category[];
};

// interface ICategory {
//   category: Category;
//   subCategories?: ICategory[];
// }

// interface Category {
//   id: number;
//   name: string;
//   image: string;
// }
