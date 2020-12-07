import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  CurrentClasses: ReplaySubject<any>=new ReplaySubject<any>();

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
  getClassesByProf(profName: string): void{
    // name, professor, notes[]
    this.http.get<any>(this.path + 'classes/professors/' + profName).subscribe((data:any) => {
      this.CurrentClasses.next(data);
    });
  }

  // get
  getClassesByID(classID: string): void{
    this.http.get<any>(this.path + 'classes/courses/' + classID).subscribe((data:any) => {
      this.CurrentClasses.next(data);
    });
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
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token });
    let options = { headers: headers };
    return this.http.post<any>(this.path + 'users/' + this.username + '/notes', {note: note, classId: classID, professor: profName}, options)
  }

  postComment(comment: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token });
    let options = { headers: headers };
    return this.http.post<any>(this.path + 'users/' + this.username + '/notes/' + this.note_id, {comments: comment}, options);
  }



  
}
