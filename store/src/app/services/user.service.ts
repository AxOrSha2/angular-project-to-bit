import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
//
@Injectable({
  providedIn: 'root'
})
//
export class UserService {

  url_api = 'http://127.0.0.1:9000/api/v1/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(this.url_api);
  }

  postUsers(user: User): Observable<any> {
    return this.http.post(this.url_api, user);
  }

  getUser(id: String): Observable<any> {
    return this.http.get(`${this.url_api}/${id}`)
  }

  putUsers(id: String, user: User): Observable<any> {
    return this.http.put(`${this.url_api}/${id}`, user);
  }

  deleteUser(id: String): Observable<any> {
    return this.http.delete(`${this.url_api}/${id}`)
  }

}
