export type Category = {
  category: ICategory;
  subCategories: Category[];
};

export type ICategory = {
  id: number;
  name: string;
  image: string;
};

export type CategoryPost = {
  name: string;
  imageUrl: string;
  parentCategoryId: number;
};

export type CategoryPut = {
  categoryId: number;
  name: string;
  imageUrl: string;
  parentCategoryId: number;
  isTopLevel: boolean;
};
