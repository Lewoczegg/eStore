import { Component } from '@angular/core';
import { CategoriesStoreItem } from '../../services/category/categories.storeItem';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-catnavigation',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './catnavigation.component.html',
  styleUrl: './catnavigation.component.scss',
})
export class CatnavigationComponent {
  constructor(public categoryStore: CategoriesStoreItem) {}
}
