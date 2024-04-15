import { Component } from '@angular/core';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { RatingsComponent } from '../ratings/ratings.component';
import { ProductsStoreItem } from '../../services/product/products.storeItem';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CurrencyPipe, RatingsComponent, AsyncPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  constructor(public productsStoreItem: ProductsStoreItem) {}
}
