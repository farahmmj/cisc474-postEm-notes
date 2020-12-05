import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, ReplaySubject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostEmService {

  private path = '';
  private _token:string='';
  CurrentUser: ReplaySubject<string>=new ReplaySubject<string>();

  constructor(private http:HttpClient) {
    this.CurrentUser.next('test');
   }

  get token():string {
    return this._token;
  }

  set token(val:string) {
    this._token = val;
    if (val == '') {
      localStorage.removeItem('token');
    } else {
      localStorage.setItem('token', val);
    }
  }

  get loggedIn():boolean {
    return this._token != '';
  }

  signup(email: string, username: string, password: string): Observable<any> {
    return this.http.post<any>(this.path + 'register', {email: email, username: username, password: password})
      .pipe(map(value => {
        return true;
      }), catchError(err => {
        return throwError(err.message || 'server error');
      }));
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.path + 'login', {email: email, password: password})
      .pipe(map(user => {
        this._token = user.data.token;
        this.CurrentUser.next(user.data.user.email);
        return user.data.user;
      }), catchError(err => {
        this.CurrentUser.next(undefined);
        return throwError(err.message || 'server error');
      }));
  }

  logout() {
    this._token = '';
    this.CurrentUser.next(undefined);
  }

  
}
