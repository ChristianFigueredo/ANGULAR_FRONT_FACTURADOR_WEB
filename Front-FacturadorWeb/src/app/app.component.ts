import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticationService } from '../app/services/autentication.service';
import { Login } from '../app/Models/loginModel';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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

    login.username = MyForm.usuarioLogin;
    login.password = MyForm.passwordLogin;
    this.autenticatioService.Login(login);
    const persona = JSON.parse(localStorage.getItem('user'));
    this.sesion = true;

    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    this.router.navigate(['home']);

}

}
