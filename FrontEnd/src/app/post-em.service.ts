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
  CurrentNote: ReplaySubject<string>=new ReplaySubject<string>();

  private username = "";
  private note_id = "";

  constructor(private http:HttpClient) {
    this.CurrentUser.next(undefined);
    this.CurrentUser.subscribe((data: string) => {
      this.username = data;
    })
    this.CurrentNote.subscribe((data: string) => {
      this.note_id = data;
    })

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
  getClassesByProf(profName: string): Observable<any> {
    // name, professor, notes[]
    return this.http.get<any>(this.path + 'classes/professors/' + profName);
  }

  // get
  getClassesByID(classID: string): Observable<any> {
    return this.http.get<any>(this.path + 'classes/courses/' + classID);
  }

  // get
  // when you click on a class entry (e.g. CISC474, G SILBER)
  getNotesByCard(classID: string, profName: string) {
    //return this.http.get<any>(this.path + )
  }

  //get
  getNote(username: string, noteID: string) {
    return this.http.get<any>(this.path + 'users/' + username + '/notes/' + noteID);
  }

  // get
  getNotesByUser(username: string) {
    return this.http.get<any>(this.path + 'users/' + username + '/notes');
  }

  postNote(note: string, classID: string, profName: string) {
    return this.http.post<any>(this.path + 'users/' + this.username + '/notes', {note: note, classId: classID, professor: profName})
  }

  postComment(comment: string) {
    return this.http.post<any>(this.path + 'users/' + this.username + '/notes/' + this.note_id, {comments: comment});
  }



  
}
