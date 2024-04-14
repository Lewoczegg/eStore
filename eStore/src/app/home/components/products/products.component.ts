import { Component } from '@angular/core';
import { ProductService } from './product.service';
import { CurrencyPipe } from '@angular/common';
import { RatingsComponent } from '../ratings/ratings.component';
import { Product } from './product.type';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CurrencyPipe, RatingsComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers: [ProductService],
})
export class ProductsComponent {
  products: Product[] = [];

  constructor(productService: ProductService) {
    productService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }
}
