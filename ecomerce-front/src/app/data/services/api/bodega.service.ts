import { IBodega } from './../../../modules/config/bodega/bodega.metadata';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BodegaService {
  API_URI = environment.uri; // URL de Backend
  constructor(private http: HttpClient) { }
  getallBodegas(){
    return this.http.get(`${this.API_URI}bodegas`);
  }
  saveBodega(newBodega: IBodega){
    return this.http.post(`${this.API_URI}bodegas`,newBodega);
  }
}
