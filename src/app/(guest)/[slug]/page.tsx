"use client";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";

const RatingList = dynamic(
  () => import("~/modules/rating/components/rating-list"),
  {
    ssr: false,
  }
);

const RelatedProduct = dynamic(() => import("./related-product"), {
  ssr: false,
});

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { toast } from "~/components/ui/use-toast";

import { BaseUtil } from "~/common/utility/base.util";
import Breadrumbs from "~/common/components/breadrumbs";
import { ProductDetailPlaceholder } from "~/common/components/skeleton/product-detail-skeleton";
import { ProductUtil } from "~/common/utility/product.util";
import MaxWidthWrapper from "~/common/components/max-width-wrapper";

import ProductDetail from "~/modules/product/components/product-detail";
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
import { Product } from "~/modules/product/models/Product";
import { ProductDescription } from "~/modules/product/components/product-description";
import { useUser } from "~/hooks/useUser";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

const ProductDetailPage = ({ params }: Props) => {
  const { user } = useUser();
  const [product, setProduct] = useState<Product | null>(null);
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
    const fetchProductData = async () => {
      try {
        const productId = ProductUtil.extractProductIdFromSlug(params.slug);
        if (isNaN(productId)) {
          notFound();
        }
        const res = await getProductById(productId);
        const product = res.data;
        setProduct(product);

        const [averageStarRes, ratingStarPercentageRes, mostUpvoteRatingRes] =
          await Promise.all([
            getAverageStarByProductId(product.id),
            getRatingStarPercentage(product.id),
            getMostUpvoteRating(product.id),
          ]);

        setAverageStar(averageStarRes.data);
        setRatingStarPercentage(ratingStarPercentageRes.data);
        setMostUpvoteRating(mostUpvoteRatingRes.data);
      } catch (error) {
        BaseUtil.handleErrorApi({ error });
      }
    };
    fetchProductData();
  }, [params.slug]);

  useEffect(() => {
    const fetchRatingData = async () => {
      if (product) {
        const ratings = await getRatingByProductId(product.id, pageNo);
        setRatingList(ratings.data.ratingList);
        setTotalElement(ratings.data.totalElements);
        setTotalPages(ratings.data.totalPages);
      }
    };
    fetchRatingData();
  }, [product, pageNo, isPost]);

  const handlePageChange = ({ selected }: any) => {
    setPageNo(selected);
  };

  const handleDeleteRating = useCallback(async (ratingId: string) => {
    const res = await deleteRating(ratingId);
    if (res.success) {
      toast({ description: res.message });
      setIsPost((prev) => !prev);
    }
  }, []);

  const toggleVoteRating = useCallback(
    async (ratingId: string) => {
      if (user.email === "") {
        toast({
          description: "Bạn cần đăng nhập trước khi thích đánh giá",
          variant: "destructive",
        });
        return;
      }
      try {
        await upvoteRating(ratingId);
        setIsPost((prev) => !prev);
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
    },
    [user.email]
  );

  return (
    <div className="flex flex-col space-y-4 mb-4">
      <Breadrumbs
        options={product?.name}
        optionPage={true}
        context="page"
        className=""
      />

      <MaxWidthWrapper>
        <div className="bg-white space-y-8">
          {product ? (
            <ProductDetail
              product={product}
              averageStar={averageStar}
              totalRating={totalElements}
            />
          ) : (
            <ProductDetailPlaceholder />
          )}

          <Tabs defaultValue="productDetails" className="w-full pt-8 bg-white">
            <TabsList className="w-full h-full p-0 bg-white border-b border-gray-300 rounded-none">
              <TabsTrigger
                value="productDetails"
                className="w-full flex justify-center text-xl"
              >
                Chi tiết sản phẩm
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="w-full flex justify-center text-xl"
              >
                Đánh giá
              </TabsTrigger>
            </TabsList>
            <TabsContent value="productDetails">
              <div className="p-4 flex flex-col space-y-4 text-sm">
                <div className="flex gap-2">
                  <span className="min-w-20 text-muted-foreground">
                    Chất liệu:
                  </span>
                  <p>{product?.material}</p>
                </div>
                <div className="flex gap-2">
                  <span className="min-w-20 text-muted-foreground">
                    Phong cách:
                  </span>
                  <p>{product?.style}</p>
                </div>
                <ProductDescription description={product?.description} />
              </div>
            </TabsContent>
            <TabsContent value="reviews">
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
            </TabsContent>
          </Tabs>
        </div>
      </MaxWidthWrapper>
      {product && (
        <RelatedProduct
          productId={product.id}
          categoryId={product.category.id}
        />
      )}
    </div>
  );
};

export default ProductDetailPage;
