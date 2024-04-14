import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faSearch,
  faUserCircle,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import { CategoriesStoreItem } from '../../services/categories.storeItem';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  faSearch = faSearch;
  faUserCircle = faUserCircle;
  faShoppingCart = faShoppingCart;

  constructor(public categoryStore: CategoriesStoreItem) {}
}
