import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IPersona } from './../../interfaces/persona.metadata';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  API_URI = environment.uri; // URL de Backend
  constructor(private http: HttpClient) { }
  savePersonas(newPersonas: IPersona){
    return this.http.post(`${this.API_URI}persona`,newPersonas);
  }

}