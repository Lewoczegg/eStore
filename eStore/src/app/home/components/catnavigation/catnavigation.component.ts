import { Component, EventEmitter, Output } from '@angular/core';
import { CategoriesStoreItem } from '../../services/category/categories.storeItem';
import { AsyncPipe } from '@angular/common';
import { Category } from '../../types/category.type';

@Component({
  selector: 'app-catnavigation',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './catnavigation.component.html',
  styleUrl: './catnavigation.component.scss',
})
export class CatnavigationComponent {
  @Output()
  categoryClicked: EventEmitter<number> = new EventEmitter<number>();
  constructor(public categoryStore: CategoriesStoreItem) {}

  onCategoryClick(category: Category): void {
    this.categoryClicked.emit(category.id);
  }
}
