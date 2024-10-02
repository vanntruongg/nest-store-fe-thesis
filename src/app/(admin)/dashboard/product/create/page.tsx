"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  ProductShema,
  ProductShemaCreateType,
} from "~/app/schema-validations/product.shema";
import Loading from "~/common/components/loading";
import { toast } from "~/components/ui/use-toast";
import { FormCreateProduct } from "./form-create";

import { BaseUtil } from "~/common/utility/base.util";

import { uploadToCloudinary } from "~/modules/common/services/CloudinaryService";
import { FileWithPreview } from "~/modules/common/model/FileWithPreview";
import { createProduct } from "~/modules/product/services/ProductService";
import { ProductPost } from "~/modules/product/models/ProductPost";

export default function CreateProductPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [imageSelected, setImageSelected] = useState<FileWithPreview | null>(
    null
  );

  const form = useForm<ProductShemaCreateType>({
    resolver: zodResolver(ProductShema),
    defaultValues: {
      name: "",
      price: undefined,
      material: "",
      style: "",
      imageUrl: "",
      description: "",
      stock: [],
      category: { id: 0, name: "" },
    },
  });

  const handleCreateProduct = async (data: ProductShemaCreateType) => {
    setLoading(true);
    try {
      const imageUrl = await uploadToCloudinary(imageSelected);
      const productPost: ProductPost = {
        name: data.name,
        price: data.price,
        material: data.material,
        style: data.style,
        imageUrl: imageUrl,
        description: data.description,
        stock: data.stock,
        categoryId: data.category.id,
      };
      const result = await createProduct(productPost);
      toast({ description: result.message });
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100">
      <h2 className="py-2 text-2xl font-semibold rounded-md">Thêm sản phẩm</h2>
      {loading && <Loading />}
      <FormCreateProduct
        form={form}
        onSubmit={handleCreateProduct}
        imageSelected={imageSelected}
        setImageSelected={setImageSelected}
      />
    </div>
  );
}
