import { Injectable } from '@angular/core';
import { StoreItem } from '../../../shared/storeItem';
import { Product } from '../../types/product.type';
import { ProductService } from './product.service';
import { Observable } from 'rxjs';

@Injectable()
export class ProductsStoreItem extends StoreItem<Product[]> {
  constructor(private productService: ProductService) {
    super([]);
  }

  async loadProducts(query?: string) {
    this.productService.getAllProducts(query).subscribe((products) => {
      this.setValue(products);
    });
  }

  get products$(): Observable<Product[]> {
    return this.value$;
  }

  get products(): Product[] {
    return this.value;
  }
}
