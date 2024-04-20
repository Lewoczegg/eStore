import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faSearch,
  faShoppingCart,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs';
import { CategoriesStoreItem } from '../../services/category/categories.storeItem';
import { SearchKeyword } from '../../types/searchKeyword.type';
import { CartStoreItem } from '../../services/cart/cart.storeItems';
import { UserService } from '../../services/users/user-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, AsyncPipe, CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnDestroy {
  faSearch = faSearch;
  faUserCircle = faUserCircle;
  faShoppingCart = faShoppingCart;
  subscriptions: Subscription = new Subscription();
  isUserAuthenticated: boolean = false;
  userName: string = '';
  displaySearch: boolean = true;

  @Output()
  searchClicked: EventEmitter<SearchKeyword> =
    new EventEmitter<SearchKeyword>();

  constructor(
    public categoryStore: CategoriesStoreItem,
    private router: Router,
    public cartStoreItem: CartStoreItem,
    public userService: UserService
  ) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.displaySearch =
          (event as NavigationEnd).url === '/home/products' ? true : false;
      });

    this.subscriptions.add(
      this.userService.isUserAuthenticated$.subscribe((result) => {
        this.isUserAuthenticated = result;
      })
    );

    this.subscriptions.add(
      this.userService.loggedInUser$.subscribe((result) => {
        this.userName = result.firstName;
      })
    );
  }

  onClickSearch(keyword: string, categoryId: string) {
    this.searchClicked.emit({
      categoryId: parseInt(categoryId),
      keyword: keyword,
    });
  }

  navigateToCart(): void {
    this.router.navigate(['home/cart']);
  }

  logout(): void {
    this.userService.logout();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
