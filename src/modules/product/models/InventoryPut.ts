export type InventoryPut = {
  productId: number;
  sizeQuantity: {
    size: string;
    quantity: number;
  }[];
};
