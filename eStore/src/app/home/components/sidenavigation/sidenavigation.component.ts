import { Component } from '@angular/core';
import { Category } from '../../types/category.type';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-sidenavigation',
  standalone: true,
  imports: [],
  templateUrl: './sidenavigation.component.html',
  styleUrl: './sidenavigation.component.scss',
})
export class SidenavigationComponent {
  categoreis: Category[] = [];

  constructor(categoryService: CategoryService) {
    this.categoreis = categoryService.getAllCategories();
  }

  getCategoires(parent_category_id?: number): Category[] {
    return this.categoreis.filter((category) => category.parent_category_id === parent_category_id);
  }
}
