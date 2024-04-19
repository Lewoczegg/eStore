import { Component } from '@angular/core';
import { CartStoreItem } from '../../services/cart/cart.storeItems';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartItem } from '../../types/cart.type';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AsyncPipe, CommonModule, CurrencyPipe } from '@angular/common';
import { RatingsComponent } from '../ratings/ratings.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, AsyncPipe, CurrencyPipe, RatingsComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  faTrash = faTrash;

  constructor(public cartStoreItem: CartStoreItem, private router: Router) {}

  navigateToHome(): void {
    this.router.navigate(['/home/products']);
  }

  updateQuantity($event: any, cartItem: CartItem): void {
    if($event.target.innerText === '+') {
      this.cartStoreItem.addProduct(cartItem.product);
    } else if($event.target.innerText === '-') {
      this.cartStoreItem.decreaseProductQuantity(cartItem);
    }
  }

  removeItem(cartItem: CartItem): void {
    this.cartStoreItem.removeProduct(cartItem);
  }
}
