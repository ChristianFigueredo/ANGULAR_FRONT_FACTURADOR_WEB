import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Cliente } from '../../../Models/clienteModel';
import { ClientesService } from '../../../services/clientes.service';
import { RespuestaTransaccion } from '../../../Models/respuestaTransaccionModel';

// Declaramos las variables para jQuery
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.component.html',
  styleUrls: ['./registrar-cliente.component.css']
})
export class RegistrarClienteComponent implements OnInit {

  tipoDocumento: string;
  numeroDocumento: string;
  newClienteForm: FormGroup;
  mensaje: string;
  codigo: string;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private servicioCliente: ClientesService
  ) { }

  ngOnInit() {
    this.tipoDocumento = this.route.snapshot.params['tipo_documento'];
    this.numeroDocumento = this.route.snapshot.params['numero_documento'];

    // formulario registrar nuevo cliente
    this.newClienteForm = this.formBuilder.group({
        clienteTipoDocumento: [this.tipoDocumento, Validators.required],
        clienteNumeroDocumento: [this.numeroDocumento, Validators.required],
        clienteNombre: ['', Validators.required],
        clienteApellido: ['', Validators.required],
        clienteTelefono: [''],
        clienteEmail: [''],
        clienteDireccion: ['']
    });
  }

  onSubmit(MyForm: any) {
    const cliente = new Cliente();
    cliente.NOMBRE = MyForm.clienteNombre;
    cliente.APELLIDO = MyForm.clienteApellido;
    cliente.NUMERO_DOCUMENTO = this.numeroDocumento;
    cliente.TIPO_DOCUMENTO = this.tipoDocumento;
    cliente.TELEFONO = MyForm.clienteTelefono;
    cliente.EMAIL = MyForm.clienteEmail;
    cliente.DIRECCION = MyForm.clienteDireccion;

    this.servicioCliente.insertCliente(cliente)
    .subscribe( (data: any) => {
       this.codigo = data.codigo;
       this.mensaje = data.mensaje;
    });

    $('#myModal').modal();
  }

  cerrar_modal() {
    this.router.navigate(['facturador/clientes/listado']);
  }

}
