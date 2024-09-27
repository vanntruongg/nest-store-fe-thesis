import { useEffect, useState } from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { ProductShemaType } from "~/app/schema-validations/product.shema";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";
import { SizeQuantity } from "~/modules/product/models/SizeQuantity";

export interface Props {
  form: UseFormReturn<ProductShemaType>;
}

interface SelectedCategoryPath {
  categorySelected: string[];
  isLastLevel: boolean;
}

const sizes = ["S", "M", "L", "XL"];

export function InventorySelector({ form }: Props) {
  const [sizeQuantitySelected, setSizeQuantitySelected] = useState<
    SizeQuantity[]
  >([]);
  const {
    control,
    register,
    formState: { errors },
  } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "stock",
  });

  useEffect(() => {
    if (sizeQuantitySelected.length > 0) {
      form.clearErrors("stock");
    } else {
      form.setError("stock", {
        message: "Vui lòng thêm ít nhất một kích cỡ và số lượng",
      });
    }
  }, [sizeQuantitySelected]);

  const handleSelectSize = (size: string) => {
    const sizeExisted = fields.some((s) => s.size === size);

    if (sizeExisted) {
      const indexToRemove = fields.findIndex((s) => s.size === size);
      if (indexToRemove !== -1) {
        remove(indexToRemove);
      }
    } else {
      append({ size, quantity: 1 });
    }
  };

  const handleChangeQuantity = (index: number, quantity: string) => {
    const updatedQuantity = quantity === "" ? 0 : Number(quantity);
    if (updatedQuantity < 0) {
      form.setError("stock", { message: "Số lượng phải lớn hơn 0" });
    } else {
      form.clearErrors("stock");
      const currentField = fields[index];

      if (currentField) {
        currentField.quantity = updatedQuantity;
      }
    }
  };

  return (
    <div className="p-4 bg-white space-y-2 border rounded-sm">
      <h3 className="text-lg font-semibold">Kho</h3>
      <div className="space-y-2">
        <div className="flex justify-evenly gap-4 items-stretch">
          {sizes.map((size, index) => (
            <div
              key={index}
              onClick={() => handleSelectSize(size)}
              // onClick={() => append({ size, quantity: 1 })}
              className={cn(
                "w-full p-1 text-center border rounded-sm cursor-pointer",
                {
                  "border-primary text-primary": fields.some(
                    (s) => s.size === size
                  ),
                }
              )}
            >
              {size}
            </div>
          ))}
        </div>
        <div>
          {errors.stock && fields.length === 0 && (
            <span className="text-red-500 text-sm">{errors.stock.message}</span>
          )}
        </div>
      </div>
      {fields.map((field, index) => (
        <div className="flex flex-col space-y-1">
          <div key={index} className="flex items-center gap-4 text-nowrap ">
            <p className="min-w-16">{`Size: ${field.size}:`}</p>
            <Input
              type="number"
              value={field.quantity === 0 ? "" : field.quantity}
              {...register(`stock.${index}.quantity`, {
                valueAsNumber: true,
              })}
              onChange={(e) => handleChangeQuantity(index, e.target.value)}
            />
          </div>
          {errors.stock?.[index]?.quantity && (
            <p className="text-red-500 text-xs">
              {errors.stock[index].quantity?.message}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
