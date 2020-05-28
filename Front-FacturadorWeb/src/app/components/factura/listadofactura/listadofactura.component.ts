import { Component, OnInit } from '@angular/core';
import { FacturacionService } from '../../../services/facturacion.service';
import { TipoDocumentoService } from '../../../services/tipo-documento.service';
import { ClientesService } from '../../../services/clientes.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RespuestaTransaccion } from '../../../Models/respuestaTransaccionModel';
import { ObjectCreateFactura } from '../../../Models/createFactura';

@Component({
  selector: 'app-listadofactura',
  templateUrl: './listadofactura.component.html',
  styleUrls: ['./listadofactura.component.css']
})
export class ListadofacturaComponent implements OnInit {

  listaDocumento: any[] = [];
  listadoFactura: any;
  respBuscaClienteCodigo: string;
  respBuscaClienteMensaje: string;
  searchClienteForm: FormGroup;
  showMensaje = false;
  showButton = true;
  realizarOperacion: boolean;
  sesionUser: any;
  usuario: any;
  documentoClienteProceso: any;
  acronimoClienteProceso: any;

  constructor(
    private servicioFactura: FacturacionService,
    private servicioTipoDocumento: TipoDocumentoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private ServicioClientes: ClientesService) {
      this.sesionUser = JSON.parse(localStorage.getItem('user'));
      this.usuario = this.sesionUser.iD_USUARIO;
      console.log(this.usuario);

      this.servicioFactura.getFacturas().
      subscribe( (data: any) => {
           this.listadoFactura = data;
           console.log(data);
      });

      // get tipo de documento
      this.servicioTipoDocumento.getTiposDocumentos()
         .subscribe( (data: any) => {
         this.listaDocumento = data;
      });

      this.servicioTipoDocumento.getTiposDocumentos()
         .subscribe( (data: any) => {
         this.listaDocumento = data;
      });

      this.servicioFactura.getFacturasEnProceso(this.usuario)
      .subscribe( (data: any) => {
        console.log(data);
        if ( data.respuestaTransaccion.codigo === '0000') {
          this.realizarOperacion = true;
        } else {
          this.realizarOperacion = false;
          this.documentoClienteProceso = data.acronimo;
          this.acronimoClienteProceso = data.numerodocumento;
        }
      });
  }

  ngOnInit() {
    // formulario buscar cliente
    this.searchClienteForm = this.formBuilder.group({
      searchDocumentoCliente: ['', Validators.required],
      searchTipoDocumentoCliente: ['', Validators.required]
    });
  }

  buscarCliente(searchForm: any) {
    this.ServicioClientes.getCliente(searchForm.searchTipoDocumentoCliente, searchForm.searchDocumentoCliente)
    .subscribe( (data: any) => {
      this.respBuscaClienteCodigo = data.codigo;
      this.respBuscaClienteMensaje = data.mensaje;
      const acronimo = searchForm.searchTipoDocumentoCliente;
      const documento = searchForm.searchDocumentoCliente;
      console.log('Codigo' + this.respBuscaClienteMensaje);

      if ( this.respBuscaClienteCodigo === '0000') {
          // CREAR FACTURA
          this.registrarFactura(searchForm.searchDocumentoCliente, searchForm.searchTipoDocumentoCliente);
          console.log('Cliente existe, redirigir al modulo de facturacion');
          document.getElementById('close_modal').click();
          this.router.navigate(['facturador/facturas/registrar']);
      } else {
          this.showButton = false;
          this.showMensaje = true;
          console.log('El Cliente no existe en base de datos');
          setTimeout (() => {
            this.showMensaje = false;
            this.showButton = true;
            console.log('Set time out 2 seconds');
          }, 2000);
      }
    });
  }

  registrarCliente(searchForm: any) {
    this.ServicioClientes.getCliente(searchForm.searchTipoDocumentoCliente, searchForm.searchDocumentoCliente)
    .subscribe( (data: any) => {
      this.respBuscaClienteCodigo = data.codigo;
      this.respBuscaClienteMensaje = data.mensaje;
      const acronimo = searchForm.searchTipoDocumentoCliente;
      const documento = searchForm.searchDocumentoCliente;
      console.log('Codigo' + this.respBuscaClienteMensaje);
      if ( this.respBuscaClienteCodigo === '0000') {
        this.showButton = false;
        this.showMensaje = true;
        console.log('El Cliente ya se encuentra registrado en nuestra base de datos');
        setTimeout (() => {
          this.showMensaje = false;
          this.showButton = true;
          console.log('Set time out 2 seconds');
        }, 2000);
      } else {
        console.log('Cliente no existe, redirigir al registro');
        document.getElementById('close_modal').click();
        this.router.navigate(['facturador/clientes/registrar/' + acronimo + '/' + documento]);
      }
    });
  }

  facturaGenerica() {
    // CREAR FACTURA
    this.registrarFactura('XXXXXXXXXX', 'XX');
    console.log('Iniciar proceso de facturacion - cliente generico');
    document.getElementById('close_modal').click();
    this.router.navigate(['facturador/facturas/registrar']);
  }

  continuarFacturaEnProceso() {
    console.log('Continuar proceso - factura en proceso');
    document.getElementById('close_modal').click();
    this.router.navigate(['facturador/facturas/registrar']);
  }

  registrarFactura(documento: string, acronimo: string) {
    const registroFactura = new ObjectCreateFactura();
    registroFactura.clientDocumentNumber = documento;
    registroFactura.clientDocumentType = acronimo;
    registroFactura.userId = this.usuario;
    console.log('datos para el registro de la factura: ');
    console.log(registroFactura);
    this.servicioFactura.insertFactura(registroFactura).
    subscribe( (result: any) => {
        console.log(result);
    });
  }

}
