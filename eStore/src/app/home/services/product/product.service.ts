import { Injectable } from '@angular/core';
import { Product } from '../../types/product.type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  getAllProducts(query?: string): Observable<Product[]> {
    let url = 'http://localhost:8080/product';
    if (query) {
      url += '?' + query;
    }
    return this.httpClient.get<Product[]>(url);
  }

  getProductById(id: number): Observable<Product> {
    const url = 'http://localhost:8080/product/' + id;
    return this.httpClient.get<Product>(url);
  }
}
