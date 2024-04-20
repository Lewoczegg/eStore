import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartStoreItem } from '../cart/cart.storeItems';
import { Order, OrderItem } from '../../types/order.type';
import { DeliveryAddress } from '../../types/cart.type';
import { UserService } from '../users/user-service.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private httpClient: HttpClient,
    private cartStore: CartStoreItem,
    private userService: UserService
  ) {}

  saveOrder(
    deliveryAddress: DeliveryAddress,
    userEmail: string
  ): Observable<any> {
    const url: string = 'http://localhost:8080/order/add';
    const orderDetails: OrderItem[] = [];
    this.cartStore.cart.products.forEach((product) => {
      const orderItem: OrderItem = {
        productId: product.product.id,
        price: product.product.price,
        amount: product.amount,
        qty: product.quantity,
      };
      orderDetails.push(orderItem);
    });

    const order: Order = {
      userName: deliveryAddress.userName,
      address: deliveryAddress.address,
      city: deliveryAddress.city,
      state: deliveryAddress.state,
      pin: deliveryAddress.pin,
      total: this.cartStore.cart.totalAmount,
      userEmail: userEmail,
      orderDetails: orderDetails,
    };

    return this.httpClient.post(url, order, {
      headers: {
        Authorization: `Bearer ${this.userService.token}`,
      },
    });
  }
}
