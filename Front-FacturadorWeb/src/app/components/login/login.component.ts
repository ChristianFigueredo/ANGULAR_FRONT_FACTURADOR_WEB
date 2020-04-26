import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticationService } from '../../services/autentication.service';
import { Login } from '../../Models/loginModel';
import { Usuario } from '../../Models/usuarioModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
    registerForm: FormGroup;
    submitted = false;
    sesion = false;

    constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private autenticatioService: AutenticationService
    ) { }

    ngOnInit() {
      this.registerForm = this.formBuilder.group({
          usuarioLogin: ['', Validators.required],
          passwordLogin: ['', Validators.required]
      });
    }

    // para facil uso de los campos
    get f() { return this.registerForm.controls; }

    onSubmit(MyForm: any) {

      const login = new Login();
      this.submitted = true;
      if (this.registerForm.invalid) {
          return;
      }

      login.NICKNAME = MyForm.usuarioLogin;
      login.PASSWORD = MyForm.passwordLogin;
      /* this.autenticatioService.Login(login);
      const persona = JSON.parse(localStorage.getItem('user'));
      this.sesion = true; */

      this.autenticatioService.Login(login).
          subscribe( (x: any) => {
              console.log(x);
              if (x.respuestA_TRANSACCION.codigo === '0000') {
                localStorage.setItem('user', JSON.stringify( x ));
                this.router.navigate(['facturador/clientes/listado']);
              } else {
                alert( x.respuestA_TRANSACCION.mensaje + ' \n\n' + JSON.stringify(this.registerForm.value, null, 4));
              }
          });

      // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
      // this.router.navigate(['facturador/clientes/listado']);

  }

}
