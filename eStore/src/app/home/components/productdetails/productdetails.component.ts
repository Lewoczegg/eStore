import { Component, OnInit, OnDestroy } from '@angular/core';
import { RatingsComponent } from '../ratings/ratings.component';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../types/product.type';
import { Subscription } from 'rxjs';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [RatingsComponent, CurrencyPipe],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.scss',
})
export class ProductdetailsComponent implements OnInit, OnDestroy {
  product: Product;
  subscriptions: Subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductService
  ) {}

  ngOnInit(): void {
    const id: number = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.subscriptions.add(
      this.productsService.getProductById(id).subscribe((product) => {
        this.product = product;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
