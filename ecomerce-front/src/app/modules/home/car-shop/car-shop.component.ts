import { DetallePedidoService } from './../../../data/services/api/detalle-pedido.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-shop',
  templateUrl: './car-shop.component.html',
  styleUrls: ['./car-shop.component.css']
})
export class CarShopComponent implements OnInit {

  constructor(private detallepedidoservice: DetallePedidoService) { }
  productos: any = [];
  ngOnInit(): void {
    let id_cliente = localStorage.getItem('id_cliente');
    this.detallepedidoservice.getCart(id_cliente).subscribe(productos => this.productos = productos);
  }
  deleteDetalle(id_detalle_ped: number) {
    let id_cliente = localStorage.getItem('id_cliente');
    this.detallepedidoservice.deleteDetalle(id_detalle_ped).subscribe(res => {
      this.detallepedidoservice.getCart(id_cliente).subscribe(productos => this.productos = productos);
    })
  }

}
