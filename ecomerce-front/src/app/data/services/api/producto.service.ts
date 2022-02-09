import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductoService  {
  API_URI = environment.uri; // URL de Backend
  constructor(private http: HttpClient, private router: Router) { }
  getallProductos(){
    return this.http.get(`${this.API_URI}productos`);
  }
  getProducto(id:any){
    return this.http.get(`${this.API_URI}productos/${id}`);
  }

}
