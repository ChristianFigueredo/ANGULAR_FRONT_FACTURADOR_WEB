import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent} from './components/login/login.component';
import { HistoricoComponent } from './components/historico/historico.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { ClientesComponent } from './components/clientes/clientes/clientes.component';
import { RegistrarClienteComponent } from './components/clientes/registrar-cliente/registrar-cliente.component';
import { ListadoComponent } from './components/clientes/listado/listado.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: './', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'facturador', component: HomeComponent, children: [
        { path: 'clientes', component: ClientesComponent, children: [
              { path: 'listado', component: ListadoComponent },
              { path: 'registrar/:tipo_documento/:numero_documento', component: RegistrarClienteComponent }
        ]},
        { path: 'historico', component: HistoricoComponent },
        { path: 'inventario', component: InventarioComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
