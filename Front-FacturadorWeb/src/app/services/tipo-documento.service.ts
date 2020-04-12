import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TipoDocumento } from '../Models/tipoDocumento';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {
  apiURL = '/api/TipoDocumento';

  constructor(
    private httpCliente: HttpClient
  ) {
      console.log('Servicio de documentos ok');
   }

  getTiposDocumentos() {
    return this.httpCliente.get(this.apiURL);
  }
}
