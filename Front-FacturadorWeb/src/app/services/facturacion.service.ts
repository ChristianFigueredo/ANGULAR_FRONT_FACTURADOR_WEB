import { Injectable, EventEmitter } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ObjectCreateFactura } from '../Models/createFactura';
import { RestarProducto } from '../Models/restarProducto';
import { OperacionFactura } from '../Models/operacionFactura';

@Injectable({
  providedIn: 'root'
})
export class FacturacionService {

  private hubConnection: signalR.HubConnection;
  signalReceived = new EventEmitter<any>();
  apiURL = 'http://localhost:63291/api/Factura';

  constructor(private http: HttpClient) {
    this.buildConnection();
    this.startConnection();
  }
 
  private buildConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:63291/signalHub') // use su dirección de API aquí y asegúrese de usar el nombre correcto del concentrador
      .build();
  }

  private startConnection = () => {

    console.log(this.hubConnection);

    this.hubConnection
      .start()
      .then(() => {
        console.log('Inicio la conexion...');
        this.registerSignalEvents();
      })
      .catch(err => {
        console.log('Ocurrio un error mientras iniciaba la conexion: ' + err);

        // si recibe un error, intente iniciar la conexión nuevamente después de 3 segundos.
        setTimeout(function() {
          this.startConnection();
        }, 3000);
      });
  }

  private registerSignalEvents() {
    this.hubConnection.on('SignalrFacturaReceived', (data: any) => {
      this.signalReceived.emit(data);
    });
  }

  /* -------------------------------------------------------------------------------------------------------------- */

  /* Obtener facturas */
  getFacturas() {
    return this.http.get(this.apiURL);
  }

  /* Obtener facturas */
  getFacturasEnProceso(userId) {
    return this.http.get(this.apiURL + '/' + userId);
  }

  /* Registrar factura */
  insertFactura(factura: ObjectCreateFactura) {
    return this.http.post(this.apiURL, factura, { headers: { 'Content-Type': 'application/json' } });
  }

  /* Obtener factura con detalles*/
  getFacturaAndDetails(userId: number) {
    return this.http.get('http://localhost:63291/api/Productos' + '/' + userId);
  }

  /* Restar producto de factura en proceso */
  restarProductoFacturaEnProceso(restar: RestarProducto) {
    return this.http.put('http://localhost:63291/api/Productos', restar, { headers: { 'Content-Type': 'application/json' } });
  }

  /* Finalizar o Cancelar proceso de facturacion */
  OperacionFactura(operacion: OperacionFactura) {
    return this.http.put(this.apiURL, operacion, { headers: { 'Content-Type': 'application/json' } });
  }

}
