import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../types/user.type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  createUser(user: User): Observable<any> {
    const url = 'http://localhost:8080/signup';
    return this.httpClient.post(url, user);
  }
}
