import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { InventarioRegistro } from '../../../Models/Inventario/inventarioPostRequest';
import { InventarioService } from '../../../services/inventario.service';

// Declaramos las variables para jQuery
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-registrarinventario',
  templateUrl: './registrarinventario.component.html',
  styleUrls: ['./registrarinventario.component.css']
})
export class RegistrarinventarioComponent implements OnInit {
  newInventarioForm: FormGroup;
  mensaje: string;
  codigo: string;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private inventarioService: InventarioService) { }

  ngOnInit() {
    this.newInventarioForm = this.formBuilder.group({
        inventarioNombre: ['', Validators.required],
        inventarioDescripcion: ['', Validators.required],
        inventarioTotalRecibidos: ['', Validators.required],
        inventarioPorcentajeIva: ['', Validators.required],
        inventarioPorcentajeDescuento: ['', Validators.required],
        inventarioPrecioCompra: ['', Validators.required],
        inventarioPrecioVenta: ['', Validators.required]
    });
  }

  onSubmit(MyForm: any) {
    const inventario = new InventarioRegistro();
    inventario.Nombre = MyForm.inventarioNombre;
    inventario.Descripcion = MyForm.inventarioDescripcion;
    inventario.PorcentajeDescuento = parseFloat( MyForm.inventarioPorcentajeDescuento );
    inventario.PorcentajeIva = parseFloat( MyForm.inventarioPorcentajeIva );
    inventario.PrecioCompra = parseFloat( MyForm.inventarioPrecioCompra );
    inventario.PrecioVenta = parseFloat( MyForm.inventarioPrecioVenta );
    inventario.TotalRecibidos = parseFloat( MyForm.inventarioTotalRecibidos );
    console.log(inventario);

    this.inventarioService.saveProductoInventario(inventario).
    subscribe( (data: any) => {
        console.log(data);
        this.codigo = data.codigo;
        this.mensaje = data.mensaje;
    });
    console.log(this.codigo);
    $('#myModal').modal();
  }

  cerrar_modal() {
    if (this.codigo === '0000') {
      this.router.navigate(['facturador/inventario/listado']);
    }
  }

}
