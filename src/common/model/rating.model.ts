interface RatingPost {
  content: string;
  star: number;
  productId: number;
  productName: string;
}

interface RatingGet {
  id: string;
  content: string;
  star: number;
  productId: number;
  productName: string;
  createBy: string;
  lastName: string;
  firstName: string;
  createDate: string;
}

interface RatingGetList {
  ratingList: RatingGet[];
  totalElements: number;
  totalPages: number;
}
