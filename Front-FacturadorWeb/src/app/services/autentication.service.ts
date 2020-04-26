import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../Models/loginModel';

@Injectable({
  providedIn: 'root'
})
export class AutenticationService {
  apiURL = '/api/Usuario';

  constructor(private http: HttpClient) { }

  /*public Login(user: Login) {
    localStorage.setItem('user', JSON.stringify( user ));
  }*/

  public Logout() {
    localStorage.removeItem('user');
  }

   /* Iniciar sesion */
  Login(user: Login) {
    return this.http.post(this.apiURL, user, { headers: { 'Content-Type': 'application/json' } });
  }

}
