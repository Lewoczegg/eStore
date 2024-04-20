import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User, UserDTO, loginToken } from '../../types/user.type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );
  private loggedInUserInfo: BehaviorSubject<UserDTO> = new BehaviorSubject(
    <UserDTO>{}
  );

  constructor(private httpClient: HttpClient) {}

  get isUserAuthenticated(): boolean {
    return this.isAuthenticated.value;
  }

  get isUserAuthenticated$(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  get loggedInUser$(): Observable<UserDTO> {
    return this.loggedInUserInfo.asObservable();
  }

  createUser(user: User): Observable<any> {
    const url = 'http://localhost:8080/signup';
    return this.httpClient.post(url, user);
  }

  login(email: string, password: string): Observable<any> {
    const url = 'http://localhost:8080/login';
    return this.httpClient.post(url, { email: email, password: password });
  }

  activateToken(token: loginToken): void {
    console.log(token);

    localStorage.setItem('token', token.token);
    localStorage.setItem(
      'expiry',
      new Date(Date.now() + token.expiresInSeconds * 1000).toISOString()
    );
    localStorage.setItem('firstName', token.userDTO.firstName);
    localStorage.setItem('lastName', token.userDTO.lastName);
    localStorage.setItem('address', token.userDTO.address);
    localStorage.setItem('city', token.userDTO.city);
    localStorage.setItem('state', token.userDTO.state);
    localStorage.setItem('pin', token.userDTO.pin);

    this.isAuthenticated.next(true);
    this.loggedInUserInfo.next(token.userDTO);
  }
}
