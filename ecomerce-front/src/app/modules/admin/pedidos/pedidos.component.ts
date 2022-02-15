import { Component, OnInit } from '@angular/core';
import { PedidoService } from '@data/services/api/pedido.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  pedidos:any = [];
  constructor(private pedidoservices:PedidoService) { }

  ngOnInit(): void {
    this.getPedidos();
  }
  getPedidos(){
    this.pedidoservices.getallPedido().subscribe(pedidos=> this.pedidos=pedidos);
  }

}
