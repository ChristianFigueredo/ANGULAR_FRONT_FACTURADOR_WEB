import { Component, OnInit } from '@angular/core';
import { AutenticationService } from '../../../services/autentication.service';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.css']
})
export class NavbarMenuComponent implements OnInit {

  constructor(
    private servicioAutenticacion: AutenticationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  Logout(){
    this.servicioAutenticacion.Logout();
    this.router.navigate(['login']);
  }

}
