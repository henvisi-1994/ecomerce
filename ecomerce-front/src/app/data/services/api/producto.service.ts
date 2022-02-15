import { IProducto } from './../../../modules/config/producto/producto.metadata';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  API_URI = environment.uri; // URL de Backend
  constructor(private http: HttpClient, private router: Router) { }
  getallProductos() {
    return this.http.get(`${this.API_URI}productos`);
  }
  getProducto(id: any) {
    return this.http.get(`${this.API_URI}productos/${id}`);
  }
  saveProducto(newProducto: IProducto, file: File) {
    const form = new FormData();
    form.append('codigo_prod', newProducto.codigo_prod);
    form.append('codbarra_prod', newProducto.codbarra_prod);
    form.append('descripcion_prod', newProducto.descripcion_prod);
    form.append('present_prod', newProducto.present_prod);
    form.append('precio_prod', newProducto.precio_prod.toString());
    form.append('stockmin_prod', newProducto.stockmin_prod.toString());
    form.append('stockmax_prod', newProducto.stockmax_prod.toString());
    form.append('fechaing_prod', newProducto.fechaing_prod);
    form.append('fechaelab_prod', newProducto.fechaelab_prod);
    form.append('fechacad_prod', newProducto.fechacad_prod);
    form.append('aplicaiva_prod', newProducto.aplicaiva_prod);
    form.append('aplicaice_prod', newProducto.aplicaiva_prod);
    form.append('util_prod', newProducto.util_prod.toString());
    form.append('comision_prod', newProducto.comision_prod.toString());
    form.append('observ_prod', newProducto.observ_prod);
    form.append('estado_prod', newProducto.estado_prod);
    form.append('id_bod', newProducto.id_bod.toString());
    form.append('id_marca', newProducto.id_marca.toString());
    form.append('id_cat', newProducto.id_cat.toString());
    form.append('id_empresa', newProducto.id_empresa.toString());
    form.append('stock_prod', newProducto.stock_prod.toString());
    form.append('url', this.API_URI);
    form.append('file', file);
    return this.http.post(`${this.API_URI}productos`, form);
  }
  updateProducto(newProducto: IProducto, file: File) {
    const form = new FormData();
    form.append('codigo_prod', newProducto.codigo_prod);
    form.append('codbarra_prod', newProducto.codbarra_prod);
    form.append('descripcion_prod', newProducto.descripcion_prod);
    form.append('present_prod', newProducto.present_prod);
    form.append('precio_prod', newProducto.precio_prod.toString());
    form.append('stockmin_prod', newProducto.stockmin_prod.toString());
    form.append('stockmax_prod', newProducto.stockmax_prod.toString());
    form.append('fechaing_prod', newProducto.fechaing_prod);
    form.append('fechaelab_prod', newProducto.fechaelab_prod);
    form.append('fechacad_prod', newProducto.fechacad_prod);
    form.append('aplicaiva_prod', newProducto.aplicaiva_prod);
    form.append('aplicaice_prod', newProducto.aplicaiva_prod);
    form.append('util_prod', newProducto.util_prod.toString());
    form.append('comision_prod', newProducto.comision_prod.toString());
    form.append('observ_prod', newProducto.observ_prod);
    form.append('estado_prod', newProducto.estado_prod);
    form.append('id_bod', newProducto.id_bod.toString());
    form.append('id_marca', newProducto.id_marca.toString());
    form.append('id_cat', newProducto.id_cat.toString());
    form.append('id_empresa', newProducto.id_empresa.toString());
    form.append('stock_prod', newProducto.stock_prod.toString());
    form.append('url', this.API_URI);
    form.append('file', file);
    return this.http.put(`${this.API_URI}productos/${newProducto.id_prod}`, form);
  }
  deleteProducto(id_producto: number) {
    return this.http.delete(`${this.API_URI}productos/${id_producto}`);
  }


}
