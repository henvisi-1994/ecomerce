import { IDetallePedido } from './detalle-pedido.metadata';
import { DetallePedidoService } from './../../../data/services/api/detalle-pedido.service';
import { PedidoService } from './../../../data/services/api/pedido.service';
import { IPedido } from './pedido.metadata';
import { FormaPagoService } from './../../../data/services/api/forma-pago.service';
import { ProductoService } from './../../../data/services/api/producto.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  producto: any;
  pedido: IPedido = {
    id_pedido: 0,
    cantidad: 1,
    fecha_inicio: '',
    fecha_ult_mod: '',
    fecha_registro_ped: '',
    estado_ped: '',
    id_cliente: 0,
    id_formapago: 0
  }
  detallePedido: IDetallePedido = {
    id_detalle_ped: 0,
    id_prod: 0,
    id_pedido: 0
  }
  forpagos: any = [];
  constructor(
    private productService: ProductoService,
    private formaPagoservice: FormaPagoService,
    private pedidoservice: PedidoService,
    private detallePedidoservice: DetallePedidoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.productService.getProducto(params.get("id")).subscribe(producto => this.producto = producto);
      }

    })
    this.getFormaPagos();
  }
  getFormaPagos() {
    this.formaPagoservice.getallFormaPago().subscribe(r => { this.forpagos = r; })
  }
  savePedido(id_prod: number) {
    let id_cli = localStorage.getItem('id_cliente');
    this.pedido.id_cliente = Number.parseInt(id_cli + '');
    this.pedido.estado_ped = 'I';
    this.detallePedido.id_prod = id_prod;
    this.pedidoservice.savePedido(this.pedido).subscribe((res: any) => {
      let id_pedido=res.id_pedido;
      localStorage.setItem('id_pedido',id_pedido);
      this.saveDetallePedido(id_pedido);
    })
  }
  saveDetallePedido(id_pedido: any) {
    this.detallePedido.id_pedido = id_pedido;
    this.detallePedidoservice.saveDetalle(this.detallePedido).subscribe((res: any) => {
      alert('pedido creado exitosamente');
    })
  }

}
