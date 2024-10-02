import { useFieldArray, UseFormReturn } from "react-hook-form";

import {
  ProductShemaCreateType,
  InventoryUpdateType,
} from "~/app/schema-validations/product.shema";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";
import { AddNewSize } from "./add-new-size-dialog";
import { useEffect, useState } from "react";

export interface Props {
  form: UseFormReturn<ProductShemaCreateType | InventoryUpdateType>;
  context: "create" | "update";
}

export function InventorySelector({ form, context }: Props) {
  const [sizes, setSizes] = useState<string[]>(["S", "M", "L", "XL"]);
  const [newSizes, setNewSizes] = useState<string[]>(() => {
    const savedSizes = localStorage.getItem("sizes");
    return savedSizes ? JSON.parse(savedSizes) : [];
  });
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
    return () => localStorage.removeItem("sizes");
  }, []);

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

  return (
    <div className="p-4 bg-white space-y-2 border rounded-sm">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Kho</h3>
        <AddNewSize sizes={newSizes} setSizes={setNewSizes} />
      </div>
      {context === "create" && (
        <div className="space-y-2">
          <div className="grid grid-cols-4 gap-4">
            {sizes.map((size, index) => (
              <div
                key={index}
                onClick={() => handleSelectSize(size)}
                className={cn(
                  "w-full p-1 text-center border rounded-sm cursor-pointer",
                  {
                    "bg-primary text-white": fields.some(
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
              <span className="text-red-500 text-sm">
                {errors.stock.message}
              </span>
            )}
          </div>
        </div>
      )}
      {newSizes.length > 0 && (
        <div className="space-y-2">
          <div className="grid grid-cols-4 gap-4">
            {newSizes.map((size, index) => (
              <div
                key={index}
                onClick={() => handleSelectSize(size)}
                className={cn(
                  "w-full p-1 text-center border rounded-sm cursor-pointer",
                  {
                    "bg-primary text-white": fields.some(
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
              <span className="text-red-500 text-sm">
                {errors.stock.message}
              </span>
            )}
          </div>
        </div>
      )}
      {fields.map((field, index) => (
        <div className="flex flex-col space-y-1">
          <div key={index} className="flex items-center gap-4 text-nowrap ">
            <p className="min-w-16">{`Size ${field.size}:`}</p>
            <Input
              type="number"
              {...register(`stock.${index}.quantity`, {
                valueAsNumber: true,
              })}
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
