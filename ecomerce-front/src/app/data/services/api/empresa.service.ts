import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  API_URI = environment.uri; // URL de Backend
  constructor(private http: HttpClient) { }
  getallEmpresas(){
    return this.http.get(`${this.API_URI}empresas`);
  }
}
