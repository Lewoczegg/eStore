import { Injectable } from '@angular/core';
import { StoreItem } from '../../shared/storeItem';
import { CategoryService } from './category.service';
import { Observable, map } from 'rxjs';
import { Category } from '../types/category.type';

@Injectable()
export class CategoriesStoreItem extends StoreItem<Category[]> {
  constructor(private categoryService: CategoryService) {
    super([]);
  }

  async loadCategories() {
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.setValue(categories);
    });
  }

  get categories$(): Observable<Category[]> {
    return this.value$;
  }

  get topLevelCategories$(): Observable<Category[]> {
    return this.value$.pipe(
      map((categories) =>
        categories.filter((category) => category.parentCategory === null)
      )
    );
  }
}
