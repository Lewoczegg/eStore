import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartStoreItem } from '../../services/cart/cart.storeItems';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartItem, DeliveryAddress } from '../../types/cart.type';
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
import { OrderService } from '../../services/order/order.service';

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
  alertType: number = 0;
  alertMessage: string = '';
  disableCheckout: boolean = false;

  constructor(
    public cartStoreItem: CartStoreItem,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private orderService: OrderService
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
      this.userService.loggedInUser$.subscribe((loggedUser) => {
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

  onSubmit(): void {
    if (this.userService.isUserAuthenticated) {
      const deliveryAddress: DeliveryAddress = {
        userName: this.orderForm.get('name')?.value,
        address: this.orderForm.get('address')?.value,
        city: this.orderForm.get('city')?.value,
        state: this.orderForm.get('state')?.value,
        pin: this.orderForm.get('pin')?.value,
      };
      this.subscriptions.add(
        this.orderService
          .saveOrder(deliveryAddress, this.user.email)
          .subscribe({
            next: (result) => {
              this.cartStoreItem.clearCart();
              this.alertType = 0;
              this.alertMessage = 'Order registered successfully';
              this.disableCheckout = true;
            },
            error: (error) => {
              this.alertType = 2;
              this.alertMessage = 'Please log in to register your order.';
            },
          })
      );
    } else {
      this.alertType = 1;
      this.alertMessage = 'Please log in to register your order.';
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
