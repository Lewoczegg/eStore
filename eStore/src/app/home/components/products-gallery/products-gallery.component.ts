import { Component } from '@angular/core';
import { ProductsStoreItem } from '../../services/product/products.storeItem';
import { SidenavigationComponent } from '../sidenavigation/sidenavigation.component';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-products-gallery',
  standalone: true,
  imports: [SidenavigationComponent, ProductsComponent],
  templateUrl: './products-gallery.component.html',
  styleUrl: './products-gallery.component.scss',
})
export class ProductsGalleryComponent {
  constructor(private productsStoreItem: ProductsStoreItem) {}

  onSelectSubCategory(subCategoryId: number): void {
    this.productsStoreItem.loadProducts('subCategoryId=' + subCategoryId);
  }
}
