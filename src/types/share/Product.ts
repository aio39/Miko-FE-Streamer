import { CommonProps } from "./common/common";

export interface Product extends CommonProps {
  id: number;
  created_at: string;
  updated_at: string;
  concert_id: number;
  price: number;
  name: string;
  detail: string;
  image: string;
}

export type CreateProductData = Pick<Product, "detail">;
