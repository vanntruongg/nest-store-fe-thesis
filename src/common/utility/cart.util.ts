import { SizeQuantity } from "~/modules/product/models/SizeQuantity";

export class CartUtil {
  static validateQuantity(
    sizeQuantities: SizeQuantity[],
    selectedSize: string,
    selectedQuantity: number,
    quantityInStock: number
  ) {
    const quantityInCart = this.getProductQuantityBySize(
      sizeQuantities,
      selectedSize
    ) as number;

    if (quantityInCart) {
      return selectedQuantity + quantityInCart < quantityInStock;
    }
    return true;
  }

  static validateSize(
    size: string | undefined,
    setError: (error: boolean) => void
  ) {
    if (size === undefined) {
      setError(true);
      return false;
    } else {
      setError(false);
      return true;
    }
  }

  static getProductQuantityBySize(
    sizeQuantities: SizeQuantity[],
    selectedSize: string
  ) {
    const productWithSize = sizeQuantities.find(
      (size) => size.size === selectedSize
    );
    if (productWithSize) {
      return productWithSize.quantity;
    }
  }
}
