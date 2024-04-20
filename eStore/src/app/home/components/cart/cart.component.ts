import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartStoreItem } from '../../services/cart/cart.storeItems';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartItem } from '../../types/cart.type';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AsyncPipe, CommonModule, CurrencyPipe } from '@angular/common';
import { RatingsComponent } from '../ratings/ratings.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/users/user-service.service';
import { UserDTO } from '../../types/user.type';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    FontAwesomeModule,
    CommonModule,
    AsyncPipe,
    CurrencyPipe,
    RatingsComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit, OnDestroy {
  faTrash = faTrash;
  orderForm: FormGroup;
  user: UserDTO;
  subscriptions: Subscription = new Subscription();

  constructor(
    public cartStoreItem: CartStoreItem,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.user = {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      pin: '',
      email: '',
    };

    this.subscriptions.add(
      userService.loggedInUser$.subscribe((loggedUser) => {
        if (loggedUser.firstName) {
          this.user = loggedUser;
        }
      })
    );
  }

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      name: [
        `${this.user.firstName} ${this.user.lastName}`,
        Validators.required,
      ],
      address: [this.user.address, Validators.required],
      city: [this.user.city, Validators.required],
      state: [this.user.state, Validators.required],
      pin: [this.user.pin, Validators.required],
    });
  }

  navigateToHome(): void {
    this.router.navigate(['/home/products']);
  }

  updateQuantity($event: any, cartItem: CartItem): void {
    if ($event.target.innerText === '+') {
      this.cartStoreItem.addProduct(cartItem.product);
    } else if ($event.target.innerText === '-') {
      this.cartStoreItem.decreaseProductQuantity(cartItem);
    }
  }

  removeItem(cartItem: CartItem): void {
    this.cartStoreItem.removeProduct(cartItem);
  }

  onSubmit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
