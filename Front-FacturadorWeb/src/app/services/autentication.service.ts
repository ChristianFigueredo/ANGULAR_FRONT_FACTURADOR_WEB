import { Injectable } from '@angular/core';
import { Login } from '../Models/loginModel';

@Injectable({
  providedIn: 'root'
})
export class AutenticationService {

  constructor() { }

  public Login(user: Login) {
    localStorage.setItem('user', JSON.stringify( user ));
  }

  public Logout() {
    localStorage.removeItem('user');
  }
}
