import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cliente } from '../Models/clienteModel';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  apiURL = '/api/Cliente';

  constructor(private http: HttpClient) {
    console.log('Servicio clientes Listo');
  }

  /* Obtener todos los clientes */
  getClientes() {
    return this.http.get(this.apiURL);
  }

  /* Actualizar cliente */
  updateCliente(cliente: Cliente) {
    return this.http.put(this.apiURL, cliente, { headers: { 'Content-Type': 'application/json' } });
  }

  /* Consultar cliente por numero de documento */
  getCliente(acronimo: string, numeroDocumento: string) {
    const complemento = '/ACRONIMO/' + acronimo + '/NUMERO_DOCUMENTO/' + numeroDocumento;
    return this.http.get( this.apiURL + complemento );
  }

  /* Registrar cliente */
  insertCliente(cliente: Cliente) {
    return this.http.post(this.apiURL, cliente, { headers: { 'Content-Type': 'application/json' } });
  }



}
