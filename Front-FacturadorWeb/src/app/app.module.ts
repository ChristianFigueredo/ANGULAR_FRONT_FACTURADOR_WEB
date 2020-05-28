import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarMenuComponent } from './components/shared/navbar-menu/navbar-menu.component';
import { RegistrarClienteComponent } from './components/clientes/registrar-cliente/registrar-cliente.component';
import { ModificarClienteComponent } from './components/clientes/modificar-cliente/modificar-cliente.component';

import { ListadoinventarioComponent } from './components/inventario/listadoinventario/listadoinventario.component';
import { ClientesComponent } from './components/clientes/clientes/clientes.component';
import { ListadoComponent } from './components/clientes/listado/listado.component';
// animaciones
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// peticiones  http
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { InventarioComponent } from './components/inventario/inventario/inventario.component';
import { RegistrarinventarioComponent } from './components/inventario/registrarinventario/registrarinventario.component';
import { ModificarinventarioComponent } from './components/inventario/modificarinventario/modificarinventario.component';
import { ListadofacturaComponent } from './components/factura/listadofactura/listadofactura.component';
import { RegistrarfacturaComponent } from './components/factura/registrarfactura/registrarfactura.component';
import { FacturaComponent } from './components/factura/factura/factura.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarMenuComponent,
    RegistrarClienteComponent,
    ModificarClienteComponent,

    ClientesComponent,
    ListadoComponent,
    ListadoinventarioComponent,
    InventarioComponent,
    RegistrarinventarioComponent,
    ModificarinventarioComponent,
    ListadofacturaComponent,
    RegistrarfacturaComponent,
    FacturaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
