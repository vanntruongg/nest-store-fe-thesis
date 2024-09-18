"use client";
import { useEffect, useState } from "react";
import { BaseUtil } from "~/common/utility/base.util";
import Breadrumbs from "~/common/components/breadrumbs";
import ProductDetail from "~/modules/product/components/product-detail";
import { ProductDetailPlaceholder } from "~/common/components/skeleton/product-detail-skeleton";
import { RatingList } from "~/modules/rating/components/rating-list";
import { Rating } from "~/modules/rating/models/Rating";
import {
  createRating,
  deleteRating,
  getAverageStarByProductId,
  getRatingByProductId,
  getRatingStarPercentage,
} from "~/modules/rating/services/RatingService";
import { getProductById } from "~/modules/product/services/ProductService";
import { RatingBreakdown } from "~/modules/rating/models/RatingBreakdown";
import { RatingShemaType } from "~/app/schema-validations/rating.shema";
import { RatingPost } from "~/modules/rating/models/RatingPost";
import { toast } from "~/components/ui/use-toast";
import { Product } from "~/modules/product/models/Product";
import { ProductUtil } from "~/common/utility/product.util";

interface Props {
  params: {
    slug: string;
  };
}

const ProductDetailPage = ({ params }: Props) => {
  const [product, setProduct] = useState<Product | null>(null);
  // const [categories, setCategories] = useState<Category[]>([]);
  const [ratingList, setRatingList] = useState<Rating[]>([]);
  const [pageNo, setPageNo] = useState<number>(0);
  const [totalElements, setTotalElement] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [averageStar, setAverageStar] = useState<number>(0);
  const [ratingStarPercentage, setRatingStarPercentage] = useState<
    RatingBreakdown[]
  >([]);
  const [isPost, setIsPost] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productId = ProductUtil.extractProductIdFromSlug(params.slug);
        const res = await getProductById(productId);
        const product = res.data;
        setProduct(product);

        const averageStarResponse = await getAverageStarByProductId(product.id);
        setAverageStar(averageStarResponse.data);

        const ratingStarPercentageResponse = await getRatingStarPercentage(
          product.id
        );
        setRatingStarPercentage(ratingStarPercentageResponse.data);
      } catch (error) {
        BaseUtil.handleErrorApi({ error });
      }
    };
    fetchData();
  }, [params.slug]);

  useEffect(() => {
    const fetchData = async () => {
      if (product) {
        const ratings = await getRatingByProductId(product.id, pageNo);
        setRatingList(ratings.data.ratingList);
        setTotalElement(ratings.data.totalElements);
        setTotalPages(ratings.data.totalPages);
      }
    };
    fetchData();
  }, [product, pageNo, isPost]);

  const handlePageChange = ({ selected }: any) => {
    setPageNo(selected);
  };

  const handleCreateRating = async (data: RatingShemaType) => {
    if (product) {
      const ratingPost: RatingPost = {
        star: data.ratingStar,
        content: data.content,
        productId: product.id,
        productName: product.name,
      };
      const res = await createRating(ratingPost);
      if (res.success) {
        toast({ description: res.message });
        setIsPost(!isPost);
      }
    }
  };

  const handleDeleteRating = async (ratingId: string) => {
    console.log(ratingId);
    // const res = await deleteRating(ratingId);
    // if (res.success) {
    //   toast({ description: res.message });
    //   setIsPost(!isPost);
    // }
  };

  return (
    <div className="bg-gray-100 flex flex-col space-y-4 mb-4">
      <Breadrumbs options={product?.name} optionPage={true} context="page" />

      {product ? (
        <ProductDetail
          product={product}
          averageStar={averageStar}
          totalRating={totalElements}
        />
      ) : (
        <ProductDetailPlaceholder />
      )}

      {/* Rating */}
      <RatingList
        ratingList={ratingList}
        pageNo={pageNo}
        totalElements={totalElements}
        totalPages={totalPages}
        averageStar={averageStar}
        ratingStarPercentage={ratingStarPercentage}
        handleChangePage={handlePageChange}
        handleCreateRating={handleCreateRating}
        handleDeleteRating={handleDeleteRating}
      />
    </div>
  );
};

export default ProductDetailPage;
