import { Component } from '@angular/core';
import { ProductService } from './product.service';
import { ProductListItem } from './product.type';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers: [ProductService]
})
export class ProductsComponent {
  products: ProductListItem[] = [];

  constructor(productService: ProductService) {
    this.products = productService.getProductsList();
  }
}
