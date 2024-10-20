import Image from "next/image";
import { UseFormReturn } from "react-hook-form";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { FileWithPreview } from "~/modules/common/model/FileWithPreview";
import { cn } from "~/lib/utils";
import { ProductShemaCreateType } from "~/app/schema-validations/product.shema";

export interface Props {
  image?: string;
  imageSelected: FileWithPreview | null;
  setImageSelected: Dispatch<SetStateAction<FileWithPreview | null>>;
  form: any;
  className?: string;
}

export function ImagePreviewUploader({
  image,
  imageSelected,
  setImageSelected,
  form,
  className,
}: Props) {
  const {
    formState: { errors },
    clearErrors,
  } = form;
  const [imagePreview, setImagePreview] = useState(image || "");

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handlePreviewImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as FileWithPreview;

    if (file) {
      setImageSelected(file);
      file.preview = URL.createObjectURL(file);
      setImagePreview(file.preview);
      form.setValue("imageUrl", file.preview);
      clearErrors("imageUrl");
    }
  };
  return (
    <>
      <div
        className={cn(
          "bg-muted mx-auto w-full bg-gray-100 border border-dashed aspect-square relative",
          className
        )}
      >
        <Image
          src={imagePreview ? imagePreview : "/assets/product-default.jpg"}
          alt="image"
          fill
          sizes="100"
          className="rounded-md object-cover"
        />
      </div>
      <div className="flex flex-col items-center">
        <input
          id="chooseimage"
          type="file"
          accept="png, jpeg"
          onChange={handlePreviewImage}
          className="border sr-only"
        />
        <label htmlFor="chooseimage" className="mt-8 mb-4 cursor-pointer">
          <span className="px-4 py-1 border border-gray-500 rounded-full">
            Chọn ảnh
          </span>
        </label>
        <span className="text-xs text-gray-500">Định dạng: PNG, JPEG</span>
      </div>
      <div className="my-2 text-center">
        {errors.imageUrl && (
          <span className="text-red-500 text-sm ">
            {errors.imageUrl.message}
          </span>
        )}
      </div>
    </>
  );
}
