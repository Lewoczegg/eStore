import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User, UserDTO, loginToken } from '../../types/user.type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private autoLogoutTimer: any;
  private isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );
  private loggedInUserInfo: BehaviorSubject<UserDTO> = new BehaviorSubject(
    <UserDTO>{}
  );

  constructor(private httpClient: HttpClient) {
    this.loadToken();
  }

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
    localStorage.setItem('email', token.userDTO.email);

    this.isAuthenticated.next(true);
    this.loggedInUserInfo.next(token.userDTO);
    this.setAutoLogout(token.expiresInSeconds * 1000);
  }

  logout(): void {
    localStorage.clear();
    this.isAuthenticated.next(false);
    this.loggedInUserInfo.next(<UserDTO>{});
    clearTimeout(this.autoLogoutTimer);
  }

  private setAutoLogout(duration: number): void {
    this.autoLogoutTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }

  loadToken(): void {
    const token: string | null = localStorage.getItem('token');
    const expiry: string | null = localStorage.getItem('expiry');
    if (!token || !expiry) {
      return;
    } else {
      const expiresIn: number =
        new Date(expiry).getTime() - new Date().getTime();
      if (expiresIn > 0) {
        const firstName: string | null = localStorage.getItem('firstName');
        const lastName: string | null = localStorage.getItem('lastName');
        const address: string | null = localStorage.getItem('address');
        const city: string | null = localStorage.getItem('city');
        const state: string | null = localStorage.getItem('state');
        const pin: string | null = localStorage.getItem('pin');
        const email: string | null = localStorage.getItem('email');

        const user: UserDTO = {
          firstName: firstName !== null ? firstName : '',
          lastName: lastName !== null ? lastName : '',
          address: address !== null ? address : '',
          city: city !== null ? city : '',
          state: state !== null ? state : '',
          pin: pin !== null ? pin : '',
          email: email !== null ? email : '',
        };

        this.isAuthenticated.next(true);
        this.loggedInUserInfo.next(user);
        this.setAutoLogout(expiresIn);
      } else {
        this.logout();
      }
    }
  }
}
