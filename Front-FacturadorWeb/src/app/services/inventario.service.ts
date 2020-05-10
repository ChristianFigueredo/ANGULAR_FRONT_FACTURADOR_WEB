import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inventario } from '../Models/Inventario/inventarioPutRequest';
import { InventarioRegistro } from '../Models/Inventario/inventarioPostRequest';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  apiURL = 'http://localhost:53519/api/Inventario';

  constructor(private http: HttpClient) {
    console.log('Servicio inventario Listo');
  }

  /* Obtener producto de inventario */
  getInventario() {
    return this.http.get(this.apiURL);
  }

  /* Actualizar producto de inventario */
  updateProductoInventario(inventario: Inventario) {
    return this.http.put(this.apiURL, inventario, { headers: { 'Content-Type': 'application/json' } });
  }

  /* Actualizar producto de inventario */
  saveProductoInventario(inventario: InventarioRegistro) {
    return this.http.post(this.apiURL, inventario, { headers: { 'Content-Type': 'application/json' } });
  }
}
