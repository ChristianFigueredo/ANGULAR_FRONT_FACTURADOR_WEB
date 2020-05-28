import { Component, OnInit } from '@angular/core';
import { FacturacionService } from '../../../services/facturacion.service';
import { RestarProducto } from '../../../Models/restarProducto';
import { OperacionFactura } from '../../../Models/operacionFactura';
import { Router } from '@angular/router';
import { collectExternalReferences } from '@angular/compiler';

// Declaramos las variables para jQuery
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-registrarfactura',
  templateUrl: './registrarfactura.component.html',
  styleUrls: ['./registrarfactura.component.css']
})
export class RegistrarfacturaComponent implements OnInit {
  factura: any;
  sesionUser: any;
  usuario: any;

  constructor(private facturacionService: FacturacionService, private router: Router) {
    this.sesionUser = JSON.parse(localStorage.getItem('user'));
    this.usuario = this.sesionUser.iD_USUARIO;
  }

  ngOnInit() {
    this.facturacionService.signalReceived.subscribe((signal: any) => {
      console.log('Detalle facturacion:');
      console.log(signal);
      this.factura = signal;
    });

    this.facturacionService.getFacturaAndDetails( this.usuario ).
    subscribe( ( facturaDetail: any ) => {
        console.log(facturaDetail);
        this.factura = facturaDetail;
    });
  }

  restarProducto( codigo: string ) {
    const producto = new RestarProducto();
    producto.codBarras = codigo;
    producto.idUsuario = this.usuario;
    console.log(producto);
    this.facturacionService.restarProductoFacturaEnProceso(producto).
    subscribe( ( respuesta: any) => {
        console.log(respuesta);
    });
  }

  cancelarFactura() {
    const operacion = new OperacionFactura();
    operacion.operacion = 2;
    operacion.idUsuario = this.usuario;
    console.log('cancelar factura');
    this.facturacionService.OperacionFactura(operacion).
    subscribe( ( resultado: any) => {
      console.log('resutlado: ' + resultado);
    });
    $('#cancelarModal').modal();
    this.router.navigate(['facturador/facturas/listado']);
  }

  finalizarFactura() {
    const operacion = new OperacionFactura();
    operacion.operacion = 1;
    operacion.idUsuario = this.usuario;
    console.log('finalizar factura');
    this.facturacionService.OperacionFactura(operacion).
    subscribe( ( resultado: any) => {
      console.log('resutlado: ' + resultado);
    });
    $('#finalizarModal').modal();
    this.router.navigate(['facturador/facturas/listado']);
  }

}
