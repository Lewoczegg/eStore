import { Component } from '@angular/core';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { RatingsComponent } from '../ratings/ratings.component';
import { ProductsStoreItem } from '../../services/product/products.storeItem';
import { RouterModule } from '@angular/router';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CartStoreItem } from '../../services/cart/cart.storeItems';
import { Product } from '../../types/product.type';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CurrencyPipe,
    RatingsComponent,
    AsyncPipe,
    RouterModule,
    FontAwesomeModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  faShoppingCart = faShoppingCart;

  constructor(
    public productsStoreItem: ProductsStoreItem,
    private cartStoreItem: CartStoreItem
  ) {}

  addToCart(product: Product): void {
    this.cartStoreItem.addProduct(product);
  }
}
