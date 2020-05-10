import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RespuestaTransaccion } from '../../../Models/respuestaTransaccionModel';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Inventario } from '../../../Models/Inventario/inventarioPutRequest';
import { InventarioService } from '../../../services/inventario.service';

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
  selector: 'app-modificarinventario',
  templateUrl: './modificarinventario.component.html',
  styleUrls: ['./modificarinventario.component.css'],
  animations: [
    fadeIn,
    fadeOut
  ]
})
export class ModificarinventarioComponent implements OnInit {

  @Input() inputInventario: any;
  @Input() showMensaje;
  @Input() showButton;
  editInventarioForm: FormGroup;
  respuesta: RespuestaTransaccion;

  constructor(private formBuilder: FormBuilder, private inventarioService: InventarioService) { }

  ngOnInit() {
    this.editInventarioForm = this.formBuilder.group({
      inventarioCodigo: [0, Validators.required],
      inventarioNombre: ['', Validators.required],
      inventarioDescripcion: ['', Validators.required],
      inventarioPorcentajeDescuento: [0, Validators.required],
      inventarioPorcentajeIva: [0, Validators.required],
      inventarioPrecioCompra: [0, Validators.required],
      inventarioPrecioVenta: [0, Validators.required]
    });
  }

  onSubmit(MyForm: any) {
    const inventario = new Inventario();
    console.log(MyForm);
    console.log('input: ' + this.inputInventario.porcentajeIva);
    console.log('Form: ' + MyForm.inventarioPorcentajeIva);

    if (MyForm.inventarioCodigo === 0 ) {
      
      inventario.Codigo = this.inputInventario.codigo;
    } else {
      console.log('Chao');
      inventario.Codigo = MyForm.inventarioCodigo;
    }
    if (MyForm.inventarioNombre === '' ) {
      inventario.Nombre = this.inputInventario.nombre.toString();
    } else {
      inventario.Nombre = MyForm.inventarioNombre;
    }
    if (MyForm.inventarioDescripcion === '' ) {
      inventario.Descripcion = this.inputInventario.descripcion.toString();
    } else {
      inventario.Descripcion = MyForm.inventarioDescripcion;
    }
    if (MyForm.inventarioPorcentajeDescuento === 0 ) {
      inventario.PorcentajeDescuento = this.inputInventario.porcentajeDescuento;
    } else {
      inventario.PorcentajeDescuento = parseFloat(MyForm.inventarioPorcentajeDescuento);
    }
    if (MyForm.inventarioPorcentajeIva === 0 ) {
      inventario.PorcentajeIva = this.inputInventario.porcentajeIva;
      console.log('Hola');
    } else {
      inventario.PorcentajeIva = parseFloat(MyForm.inventarioPorcentajeIva);
      console.log('Hola');
    }
    if (MyForm.inventarioPrecioCompra === 0 ) {
      inventario.PrecioCompra = this.inputInventario.precioCompra;
    } else {
      inventario.PrecioCompra = parseFloat(MyForm.inventarioPrecioCompra);
    }
    if (MyForm.inventarioPrecioVenta === 0 ) {
      inventario.PrecioVenta = this.inputInventario.precioVenta;
    } else {
      inventario.PrecioVenta = parseFloat(MyForm.inventarioPrecioVenta);
    }
    console.log(inventario);

    // Transaccion: actualiza inventario
    this.inventarioService.updateProductoInventario(inventario).
    subscribe( (data: any) => {
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
