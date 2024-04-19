import { Component, OnInit, OnDestroy } from '@angular/core';
import { RatingsComponent } from '../ratings/ratings.component';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../types/product.type';
import { Subscription } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartStoreItem } from '../../services/cart/cart.storeItems';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [RatingsComponent, CurrencyPipe, FontAwesomeModule],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.scss',
})
export class ProductdetailsComponent implements OnInit, OnDestroy {
  product: Product;
  subscriptions: Subscription = new Subscription();
  faShoppingCart = faShoppingCart;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductService,
    private cartStoreItem: CartStoreItem
  ) {}

  ngOnInit(): void {
    const id: number = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.subscriptions.add(
      this.productsService.getProductById(id).subscribe((product) => {
        this.product = product;
      })
    );
  }

  addToCart(): void {
    this.cartStoreItem.addProduct(this.product);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
