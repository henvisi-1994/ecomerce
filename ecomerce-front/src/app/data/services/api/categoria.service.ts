import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  API_URI = environment.uri; // URL de Backend
  constructor(private http: HttpClient) { }
  getallCategorias(){
    return this.http.get(`${this.API_URI}categorias`);
  }
}
