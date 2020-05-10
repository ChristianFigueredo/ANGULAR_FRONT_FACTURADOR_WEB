import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../../../services/inventario.service';

@Component({
  selector: 'app-listadoinventario',
  templateUrl: './listadoinventario.component.html',
  styleUrls: ['./listadoinventario.component.css']
})
export class ListadoinventarioComponent implements OnInit {

  inventario: any;
  camposInventario: string[];

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

}
