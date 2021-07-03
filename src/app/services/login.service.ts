import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { config } from '../../environments/environment';
import { User } from '../models/user';
import { catchError, mapTo, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  loggedUser: string;

  constructor(private http: HttpClient) { }

  login(user: User): Observable<boolean> {
    return this.http.post<any>(`${config.apiUrl}/login`, user)
      .pipe(
        tap(tokens => this.doLoginUser(user.uId, tokens)),
        mapTo(true),
        catchError(error => {
          return of(false);
        }));
  }

  register(user: User): Observable<boolean> {
    return this.http.post<any>(`${config.apiUrl}/register`, user)
      .pipe(
        tap(() => this.loggedUser),
        mapTo(true),
        catchError(error => {
          alert(error.error.toString());
          return of(false);
        }));
  }

  updateUser(user: User): Observable<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem(this.JWT_TOKEN)}`
    });
    return this.http.post<any>(`${config.apiUrl}/updateUser`, user, { headers: headers })
      .pipe(
        tap(() => this.loggedUser),
        mapTo(true),
        catchError(error => {
          alert(error.error.toString());
          return of(false);
        }));
  }

  getUserById(id: string): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem(this.JWT_TOKEN)}`
    });
    return this.http.get<any>(`${config.apiUrl}/getUser/` + id, { headers: headers })
      .pipe(
        catchError(error => {
          alert(error.error);
          return of(null);
        }));
  }

  logout() {
    this.doLogoutUser();
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(uid: string, tokens: any) {
    localStorage.setItem("User", uid);
    this.loggedUser = uid;
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.removeTokens();
  }

  private storeTokens(tokens: any) {
    localStorage.setItem(this.JWT_TOKEN, tokens.token);
  }

  private removeTokens() {
    localStorage.removeItem("User");
    this.loggedUser = null;
    localStorage.removeItem(this.JWT_TOKEN);
  }

}
