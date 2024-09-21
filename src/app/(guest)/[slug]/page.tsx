"use client";
import { useEffect, useState } from "react";
import { BaseUtil } from "~/common/utility/base.util";
import Breadrumbs from "~/common/components/breadrumbs";
import ProductDetail from "~/modules/product/components/product-detail";
import { ProductDetailPlaceholder } from "~/common/components/skeleton/product-detail-skeleton";
import { RatingList } from "~/modules/rating/components/rating-list";
import { Rating } from "~/modules/rating/models/Rating";
import {
  deleteRating,
  getAverageStarByProductId,
  getMostUpvoteRating,
  getRatingByProductId,
  getRatingStarPercentage,
  upvoteRating,
} from "~/modules/rating/services/RatingService";
import { getProductById } from "~/modules/product/services/ProductService";
import { RatingBreakdown } from "~/modules/rating/models/RatingBreakdown";
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
  const [mostUpvoteRating, setMostUpvoteRating] = useState<Rating | null>(null);
  const [isPost, setIsPost] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productId = ProductUtil.extractProductIdFromSlug(params.slug);
        const res = await getProductById(productId);
        const product = res.data;
        setProduct(product);

        const [averageStarRes, ratingStarPercentageRes] = await Promise.all([
          getAverageStarByProductId(product.id),
          getRatingStarPercentage(product.id),
        ]);

        setAverageStar(averageStarRes.data);
        setRatingStarPercentage(ratingStarPercentageRes.data);
      } catch (error) {
        BaseUtil.handleErrorApi({ error });
      }
    };
    fetchData();
  }, [params.slug]);

  useEffect(() => {
    const fetchData = async () => {
      if (product) {
        const res = await getMostUpvoteRating(product.id);
        setMostUpvoteRating(res.data);
      }
    };
    fetchData();
  }, [product, isPost]);

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

  const handleDeleteRating = async (ratingId: string) => {
    const res = await deleteRating(ratingId);
    if (res.success) {
      toast({ description: res.message });
      setIsPost(!isPost);
    }
  };

  const toggleVoteRating = async (ratingId: string) => {
    try {
      await upvoteRating(ratingId);
      setIsPost(!isPost);
    } catch (error: any) {
      if (error.status === 401) {
        toast({
          description: "Bạn cần đăng nhập trước khi thích đánh giá",
          variant: "destructive",
        });
      } else {
        BaseUtil.handleErrorApi({ error });
      }
    }
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
        mostUpvoteRating={mostUpvoteRating}
        toggleVoteRating={toggleVoteRating}
        handleChangePage={handlePageChange}
        handleDeleteRating={handleDeleteRating}
      />
    </div>
  );
};

export default ProductDetailPage;
