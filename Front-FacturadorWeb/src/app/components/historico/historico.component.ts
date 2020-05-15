import { Component, OnInit } from '@angular/core';
import { FacturacionService } from '../../services/facturacion.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit {

  constructor(private facturacionService: FacturacionService) { }

  ngOnInit() {
    this.facturacionService.signalReceived.
    subscribe((signal: any) => {
      console.log(signal);
      // this.signalList.push(signal);
    });
  }

}
