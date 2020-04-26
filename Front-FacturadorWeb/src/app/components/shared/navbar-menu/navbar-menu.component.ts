import { Component, OnInit } from '@angular/core';
import { AutenticationService } from '../../../services/autentication.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { Usuario } from '../../../Models/usuarioModel';

@Component({
  selector: 'app-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.css']
})
export class NavbarMenuComponent implements OnInit {
  sesionUser: any;
  usuario: any;

  constructor(
    private servicioAutenticacion: AutenticationService,
    private router: Router
  ) { }



  ngOnInit() {
    this.sesionUser = JSON.parse(localStorage.getItem('user'));
    this.usuario = this.sesionUser.nombre + ' ' + this.sesionUser.apellido;
  }

  Logout(){
    this.servicioAutenticacion.Logout();
    this.router.navigate(['login']);
  }

}
