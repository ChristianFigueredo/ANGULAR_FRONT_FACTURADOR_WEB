import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../../../services/inventario.service';

// Declaramos las variables para JsBarcode
declare var JsBarcode: any;

@Component({
  selector: 'app-listadoinventario',
  templateUrl: './listadoinventario.component.html',
  styleUrls: ['./listadoinventario.component.css']
})
export class ListadoinventarioComponent implements OnInit {

  inventario: any;
  camposInventario: string[];
  codigo: any;
  nombre: any;
  descripcion: any;

  constructor(private ServicioInventario: InventarioService) {

    // get clientes
    this.ServicioInventario.getInventario()
        .subscribe( (data: any) => {
        this.inventario = data;
    });
  }

  ngOnInit() {
  }

  inventarioAux(inventarioFila: string[]) {
    this.camposInventario = inventarioFila;
    console.log(this.camposInventario);
  }

  cerrarModal() {
    this.ServicioInventario.getInventario()
        .subscribe( (data: any) => {
        this.inventario = data;
    });
  }

  verCodigoProducto(producto: any) {
    this.codigo = producto.codigo;
    this.nombre = producto.nombre;
    this.descripcion = producto.descripcion;
    JsBarcode('#codigo', producto.codigo);
  }

}
