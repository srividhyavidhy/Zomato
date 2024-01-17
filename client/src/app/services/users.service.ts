import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:4000/api/';
headers = new HttpHeaders({
  'Content-Type': 'application/json',
});


  constructor(private http:HttpClient){

  }
  createUser(data:any):Observable<any>{
    return this.http.post<any>(this.apiUrl+'register', data)
  }
  loginUser(data:any):Observable<any>{
    return this.http.post<any>(this.apiUrl+'login', data)
  }

 

}
