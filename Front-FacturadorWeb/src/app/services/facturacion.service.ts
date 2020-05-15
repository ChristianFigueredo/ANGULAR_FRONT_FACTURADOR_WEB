import { Injectable, EventEmitter } from '@angular/core';
import * as signalR from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class FacturacionService {

  private hubConnection: signalR.HubConnection;
  signalReceived = new EventEmitter<any>();


  constructor() {
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
}
