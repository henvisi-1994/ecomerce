import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormaPagoService {

  API_URI = environment.uri; // URL de Backend
  constructor(private http: HttpClient) { }
  getallFormaPago(){
    return this.http.get(`${this.API_URI}formaPago`);
  }
}
