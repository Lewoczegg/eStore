import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { CategoriesStoreItem } from './home/services/category/categories.storeItem';
import { ProductsStoreItem } from './home/services/product/products.storeItem';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    CategoriesStoreItem,
    ProductsStoreItem,
  ],
};
