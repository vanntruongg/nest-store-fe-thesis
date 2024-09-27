export type Category = {
  category: ICategory;
  subCategories: Category[];
};

interface ICategory {
  id: number;
  name: string;
  image: string;
}
