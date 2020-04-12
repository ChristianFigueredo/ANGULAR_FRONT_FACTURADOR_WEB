import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Cliente } from '../../../Models/clienteModel';
import { ClientesService } from '../../../services/clientes.service';
import { RespuestaTransaccion } from '../../../Models/respuestaTransaccionModel';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ResponseClienteModel } from '../../../Models/responseClienteModel';

// Declaramos las variables para jQuery
declare var jQuery: any;
declare var $: any;

const enterTransition = transition(':enter', [
  style({
    opacity: 0
  }),
  animate('0.5s ease-in', style({
    opacity: 1
  }))
]);

const leaveTrans = transition ( ':leave', [
  style({
    opacity: 1
  }),
  animate('2s ease-out', style({
    opacity: 0
  }))
]);

const fadeIn = trigger('fadeIn', [
  enterTransition
]);

const fadeOut = trigger('fadeOut', [
  leaveTrans
]);


@Component({
  selector: 'app-modificar-cliente',
  templateUrl: './modificar-cliente.component.html',
  styleUrls: ['./modificar-cliente.component.css'],
  animations: [
    fadeIn,
    fadeOut
  ]
})
export class ModificarClienteComponent implements OnInit {

  @Input() inputCliente: ResponseClienteModel;
  @Input() showMensaje;
  @Input() showButton;
  editClienteForm: FormGroup;
  submitted = false;
  respuesta: RespuestaTransaccion;

  name: string;

  constructor(
    private formBuilder: FormBuilder,
    private servicioCliente: ClientesService ) {
   }

   ngOnInit() {

    // formulario editar cliente
    this.editClienteForm = this.formBuilder.group({
        clienteTipoDocumento: ['', Validators.required],
        clienteNumeroDocumento: ['', Validators.required],
        clienteNombre: ['', Validators.required],
        clienteApellido: ['', Validators.required],
        clienteTelefono: [''],
        clienteEmail: [''],
        clienteDireccion: ['']
    });
  }

  onSubmit(MyForm: any) {
      const cliente = new Cliente();

      if (MyForm.clienteTipoDocumento === '' ) {
        cliente.TIPO_DOCUMENTO = this.inputCliente.tipO_DOCUMENTO.toString();
      } else {
        cliente.TIPO_DOCUMENTO = MyForm.clienteTipoDocumento;
      }

      if (MyForm.clienteNumeroDocumento === '' ) {
        cliente.NUMERO_DOCUMENTO = this.inputCliente.numerO_DOCUMENTO.toString();
      } else {
        cliente.NUMERO_DOCUMENTO = MyForm.clienteNumeroDocumento;
      }

      if (MyForm.clienteNombre === '' ) {
        cliente.NOMBRE = this.inputCliente.nombre.toString();
      } else {
        cliente.NOMBRE = MyForm.clienteNombre;
      }

      if (MyForm.clienteApellido === '' ) {
        cliente.APELLIDO = this.inputCliente.apellido.toString();
      } else {
        cliente.APELLIDO = MyForm.clienteApellido;
      }

      if (MyForm.clienteTelefono === '' ) {
        cliente.TELEFONO = this.inputCliente.telefono.toString();
      } else {
        cliente.TELEFONO = MyForm.clienteTelefono;
      }

      if (MyForm.clienteEmail === '' ) {
        cliente.EMAIL = this.inputCliente.email.toString();
      } else {
        cliente.EMAIL = MyForm.clienteEmail;
      }

      if (MyForm.clienteDireccion === '' ) {
        cliente.DIRECCION = this.inputCliente.direccion.toString();
      } else {
        cliente.DIRECCION = MyForm.clienteDireccion;
      }

      // Transaccion: actualiza el cliente
      this.servicioCliente.updateCliente(cliente)
        .subscribe( (data: RespuestaTransaccion) => {
          this.respuesta = data;
      });

      this.showButton = false;
      this.showMensaje = true;

      setTimeout (() => {
        this.showMensaje = false;
        this.showButton = true;
        console.log('Set time out 2 seconds');
      }, 2000);
  }
}
