import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
private loginstatus=false;
  constructor(private http:HttpClient) { }
  get isLoggedIn(){
return this.loginstatus;
  }
  setLoggedIn(value:boolean){
    this.loginstatus=value;
  }
  getUser(email,password){
 return this.http.post('http://localhost:1234/testLogin',{
   email,
   password
 })
  }
}
