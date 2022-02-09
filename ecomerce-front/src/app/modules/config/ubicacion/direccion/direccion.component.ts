import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { IDireccion } from './direccion.metadata';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.component.html',
  styleUrls: ['./direccion.component.css']
})
export class DireccionComponent implements OnInit {
  closeResult: string | undefined;
  direccion:IDireccion={
    id_direcion:0,
    direcion:'',
    calle:'',
    numero:'',
    piso:'',
    telefono:'',
    movil:'',
    estado_direccion:'',
    id_ciudad:0
  }
  direcciones=[{
    id_direcion:1,
    direcion:'direcion 1',
    calle:'Calle 1',
    numero:'3ra',
    piso:'tercero',
    telefono:'4545454454',
    movil:'09565656565',
    estado_direccion:'A',
    id_ciudad:1
  },
  {
    id_direcion:2,
    direcion:'direcion 2',
    calle:'Calle 2',
    numero:'3ra',
    piso:'tercero',
    telefono:'4545454454',
    movil:'09565656565',
    estado_direccion:'A',
    id_ciudad:1
  }];
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
  @ViewChild('direccionModal', { static: false }) modal: ElementRef | undefined;
  edit = false;
  constructor(private modalDireccion: NgbModal) { }

  ngOnInit(): void {
  }
   // Boton para abrir ventana modal
   open(content: any) {
    this.modalDireccion.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
  public editDireccion(direccion: any) {
    this.direccion.id_direcion = direccion.id_direcion;
    this.direccion.direcion = direccion.direcion;
    this.direccion.calle = direccion.calle;
    this.direccion.numero = direccion.numero;
    this.direccion.piso = direccion.piso;
    this.direccion.telefono = direccion.telefono;
    this.direccion.movil = direccion.movil;
    this.direccion.estado_direccion = direccion.estado_direccion;
    this.direccion.id_ciudad = direccion.id_ciudad;
    this.edit = true;
    this.open(this.modal);
  }
  public borrarDireccion(id_direcion: number) {
    const indiceElemento = this.direcciones.findIndex(el => el.id_direcion == id_direcion);
    let newTodos = [...this.direcciones];
    newTodos[indiceElemento] = { ...newTodos[indiceElemento],estado_direccion: 'I' };
    this.direcciones = newTodos;
  }
  public saveDireccion() {
    (this.edit ? this.updateDireccion() : this.storeDireccion());
  }
  public updateDireccion() {
    const indiceElemento = this.direcciones.findIndex(el => el.id_direcion == this.direccion.id_direcion);
    let newTodos = [...this.direcciones];
    newTodos[indiceElemento] = { ...newTodos[indiceElemento], direcion: this.direccion.direcion, estado_direccion: this.direccion.estado_direccion };
    this.direcciones = newTodos;
    this.limpiar();
    this.modalDireccion.dismissAll();

  }
  public storeDireccion() {
    this.direcciones.push(this.direccion);
    this.limpiar();
    this.modalDireccion.dismissAll();
  }
  private limpiar() {
    this.direccion.id_direcion =0;
    this.direccion.direcion = '';
    this.direccion.calle = '';
    this.direccion.numero = '';
    this.direccion.piso = '';
    this.direccion.telefono = '';
    this.direccion.movil = '';
    this.direccion.estado_direccion = '';
    this.direccion.id_ciudad = 0;
  }

}
