import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  API_URI = environment.uri; // URL de Backend
  constructor(private http: HttpClient) { }
  getallClientes(){
    return this.http.get(`${this.API_URI}clientes`);
  }
}
