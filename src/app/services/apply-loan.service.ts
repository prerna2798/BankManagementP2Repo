import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { config } from '../../environments/environment';
import { UserLoan } from '../models/userLoan';
import { catchError, mapTo, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class ApplyLoanService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  constructor(private http: HttpClient) { }

  getLoanById(id: string): Observable<UserLoan> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem(this.JWT_TOKEN)}`
    });
    return this.http.get<any>(`${config.apiUrl}/getUserLoan/` + id, { headers: headers })
      .pipe(
        catchError(error => {
          alert(error.error);
          return of(null);
        }));
  }

  applyLoan(userloan: UserLoan): Observable<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem(this.JWT_TOKEN)}`
    });
    return this.http.post<any>(`${config.apiUrl}/applyloan`, userloan, { headers: headers })
      .pipe(
        mapTo(true),
        catchError(error => {
          alert(error.error.toString());
          return of(false);
        }));
  }

}
