import { Category } from '../../types/category.type';

export interface Product {
  id: number;
  productName: string;
  productImg: string;
  price: number;
  ratings: number;
  productDescription: string;
  category: Category;
}
