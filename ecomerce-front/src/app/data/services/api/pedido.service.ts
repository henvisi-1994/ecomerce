import { IPedido } from './../../../modules/home/product-detail/pedido.metadata';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  API_URI = environment.uri; // URL de Backend
  constructor(private http: HttpClient) { }
  getallPedido() {
    return this.http.get(`${this.API_URI}pedido`);
  }
  savePedido(newPedido: IPedido){
    return this.http.post(`${this.API_URI}pedido`,newPedido);
  }
}
