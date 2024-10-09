"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Loading from "~/common/components/loading";
import { toast } from "~/components/ui/use-toast";

import { BaseUtil } from "~/common/utility/base.util";

import { uploadToCloudinary } from "~/modules/common/services/CloudinaryService";
import { FileWithPreview } from "~/modules/common/model/FileWithPreview";
import {
  CategorySchema,
  CategoryShemaCreateType,
} from "~/app/schema-validations/category.shema";
import { CategoryPost } from "~/modules/product/models/Category";
import { createCategory } from "~/modules/product/services/CategoryService";
import { FormCreateOrUpdateCategory } from "../form-create-or-update-category";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import { ROUTES } from "~/common/constants/routes";

export default function CreateProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [imageSelected, setImageSelected] = useState<FileWithPreview | null>(
    null
  );

  const form = useForm<CategoryShemaCreateType>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: "",
      imageUrl: "",
      category: { id: 0, name: "" },
    },
  });

  useEffect(() => {}, [form.watch("category")]);

  const onSubmit = async (data: CategoryShemaCreateType) => {
    setLoading(true);
    try {
      const imageUrl = await uploadToCloudinary(imageSelected);

      const categoryPost: CategoryPost = {
        name: data.name,
        imageUrl: imageUrl,
        parentCategoryId: data.category.id,
      };

      const result = await createCategory(categoryPost);
      toast({ description: result.message });
      router.push(ROUTES.ADMIN.CATEGORY);
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 space-y-4">
      <h2 className="py-2 text-2xl font-semibold rounded-md">Thêm danh mục</h2>
      {loading && <Loading />}
      <FormCreateOrUpdateCategory
        form={form}
        imageSelected={imageSelected}
        setImageSelected={setImageSelected}
        onSubmit={onSubmit}
      />
      <Button
        type="submit"
        onClick={form.handleSubmit(onSubmit)}
        className="self-start"
      >
        Thêm
      </Button>
    </div>
  );
}
