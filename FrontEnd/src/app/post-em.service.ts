import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, ReplaySubject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostEmService {

  private path = 'http://localhost:3000/api/';
  private _token:string='';
  CurrentUser: ReplaySubject<string>=new ReplaySubject<string>();

  constructor(private http:HttpClient) {
    this.CurrentUser.next(undefined);
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
    return this.http.post<any>(this.path + 'security/register', {email: email, username: username, password: password});
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.path + 'security/login', {email: email, password: password});
  }

  logout() {
    this._token = '';
    this.CurrentUser.next(undefined);
  }

  // get 
  getClassesByProfessor(professor: string) {
    // name, professor, notes[]
  }

  // get
  getClassesByName(className: string) {

  }



  
}
