import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientesService } from '../../../services/clientes.service';
import { Router } from '@angular/router';
import { ResponseClienteModel } from '../../../Models/responseClienteModel';
import { TipoDocumentoService } from '../../../services/tipo-documento.service';
import { TipoDocumento } from '../../../Models/tipoDocumento';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  listaDocumento: any[] = [];
  TodosLosClientes: ResponseClienteModel[] = null;
  camposCliente: string[];
  respBuscaClienteCodigo: string;
  respBuscaClienteMensaje: string;
  searchClienteForm: FormGroup;
  showMensaje = false;
  showButton = true;

  constructor(
    private ServicioClientes: ClientesService,
    private servicioTipoDocumento: TipoDocumentoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    // get clientes
    this.ServicioClientes.getClientes()
        .subscribe( (data: any) => {
        this.TodosLosClientes = data;
    });

    // get tipo de documento
    this.servicioTipoDocumento.getTiposDocumentos()
        .subscribe( (data: any) => {
        this.listaDocumento = data;
    });
   }

   ngOnInit() {
    // formulario buscar cliente
    this.searchClienteForm = this.formBuilder.group({
        searchDocumentoCliente: ['', Validators.required],
        searchTipoDocumentoCliente: ['', Validators.required]
    });
  }

  clienteAux(clienteFila: string[]) {
    this.camposCliente = clienteFila;
    console.log(this.camposCliente);
  }

  cerrarModal() {
    this.ServicioClientes.getClientes()
    .subscribe( (data: ResponseClienteModel[]) => {
        console.log(data);
        this.TodosLosClientes = data;
    });
  }

  buscarCliente(searchForm: any) {
    this.ServicioClientes.getCliente(searchForm.searchTipoDocumentoCliente, searchForm.searchDocumentoCliente)
    .subscribe( (data: any) => {
      this.respBuscaClienteCodigo = data.codigo;
      this.respBuscaClienteMensaje = data.mensaje;
    });

    if ( this.respBuscaClienteCodigo === '0000') {
        this.showButton = false;
        this.showMensaje = true;

        console.log('Cliente existe, mostrar mensaje');

        setTimeout (() => {
          this.showMensaje = false;
          this.showButton = true;
          console.log('Set time out 2 seconds');
        }, 2000);

    } else {
        console.log('Cliente no existe, redirigir al registro');
        document.getElementById('close_modal').click();
        this.router.navigate(['facturador/clientes/registrar/' + searchForm.searchTipoDocumentoCliente + '/' + searchForm.searchDocumentoCliente]);
    }
  }

}
