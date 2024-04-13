import { Injectable } from '@angular/core';
import { ProductListItem } from './product.type';
import { products } from './products.data';

@Injectable()
export class ProductService {
  constructor() {}

  getProductsList(): ProductListItem[] {
    return products;
  }
}
