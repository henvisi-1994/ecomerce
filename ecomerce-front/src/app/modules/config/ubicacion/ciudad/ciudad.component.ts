import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ICiudad } from './ciudad.metadata';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-ciudad',
  templateUrl: './ciudad.component.html',
  styleUrls: ['./ciudad.component.css']
})
export class CiudadComponent implements OnInit {
  closeResult: string | undefined;
  ciudad:ICiudad={
    id_ciudad:0,
    nombre_ciudad:'',
    estado_ciudad:'',
    id_provincia:0,
  }
  ciudades=[{
    id_ciudad:1,
    nombre_ciudad:'Machala',
    estado_ciudad:'A',
    id_provincia:1
  },
  {
    id_ciudad:2,
    nombre_ciudad:'Pasaje',
    estado_ciudad:'A',
    id_provincia:1
  },
  {
    id_ciudad:3,
    nombre_ciudad:'El Guabo',
    estado_ciudad:'A',
    id_provincia:1
  }];
  provincias=[
    {
    id_provincia:1,
    nombre_provincia:'El Oro',
    estado_provincia:'A',
    id_pais:1
  },
  {
    id_provincia:2,
    nombre_provincia:'Azuay',
    estado_provincia:'A',
    id_pais:1
  },
  {
    id_provincia:2,
    nombre_provincia:'Pichincha',
    estado_provincia:'A',
    id_pais:1
  }];
  @ViewChild('ciudadModal', { static: false }) modal: ElementRef | undefined;
  edit = false;
  constructor(private modalCiudad: NgbModal) { }

  ngOnInit(): void {
  }
   // Boton para abrir ventana modal
   open(content: any) {
    this.modalCiudad.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  // Cierra Ventana modal
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  public editCiudad(ciudad: any) {
    this.ciudad.id_ciudad = ciudad.id_ciudad;
    this.ciudad.nombre_ciudad = ciudad.nombre_ciudad;
    this.ciudad.estado_ciudad = ciudad.estado_ciudad;
    this.ciudad.id_provincia = ciudad.id_provincia;
    this.edit = true;
    this.open(this.modal);
  }
  public borrarCiudad(id_ciudad: number) {
    const indiceElemento = this.ciudades.findIndex(el => el.id_ciudad == id_ciudad);
    let newTodos = [...this.ciudades];
    newTodos[indiceElemento] = { ...newTodos[indiceElemento],estado_ciudad: 'I' };
    this.ciudades = newTodos;
  }
  public saveCiudad() {
    (this.edit ? this.updateCiudad() : this.storeCiudad());
  }
  public updateCiudad() {
    const indiceElemento = this.ciudades.findIndex(el => el.id_ciudad == this.ciudad.id_ciudad);
    let newTodos = [...this.ciudades];
    newTodos[indiceElemento] = { ...newTodos[indiceElemento], nombre_ciudad: this.ciudad.nombre_ciudad, estado_ciudad: this.ciudad.estado_ciudad };
    this.ciudades = newTodos;
    this.limpiar();
    this.modalCiudad.dismissAll();

  }
  public storeCiudad() {
    this.ciudades.push(this.ciudad);
    this.limpiar();
    this.modalCiudad.dismissAll();
  }
  private limpiar() {
    this.ciudad.id_ciudad = 0;
    this.ciudad.nombre_ciudad = "";
    this.ciudad.estado_ciudad = "";
  }

}
