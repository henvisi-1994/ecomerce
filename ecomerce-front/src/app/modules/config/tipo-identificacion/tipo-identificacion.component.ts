import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ITipoIdentificacion } from './tipoIdentificacion.metadata';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-tipo-identificacion',
  templateUrl: './tipo-identificacion.component.html',
  styleUrls: ['./tipo-identificacion.component.css']
})
export class TipoIdentificacionComponent implements OnInit {
  closeResult: string | undefined;
  tipoIdentificacion: ITipoIdentificacion = {
    id_tipo_ident: 0,
    nombre_tipo_ident: '',
    estado_tipo_ident: ''
  }
  tiposIdentificacion = [{
    id_tipo_ident: 1,
    nombre_tipo_ident: 'Cedula',
    estado_tipo_ident: 'A'
  },
  {
    id_tipo_ident: 2,
    nombre_tipo_ident: 'RUC',
    estado_tipo_ident: 'A'
  }]
  @ViewChild('tipoIdentificacionModal', { static: false }) modal: ElementRef | undefined;
  edit = false;
  constructor(private modalTipoIdentificacion: NgbModal) { }

  ngOnInit(): void {
  }
  // Boton para abrir ventana modal
  open(content: any) {
    this.modalTipoIdentificacion.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
  public editTipoIdentificacion(tipoIdentificacion: any) {
    this.tipoIdentificacion.id_tipo_ident = tipoIdentificacion.id_tipo_ident;
    this.tipoIdentificacion.nombre_tipo_ident = tipoIdentificacion.nombre_tipo_ident;
    this.tipoIdentificacion.estado_tipo_ident = tipoIdentificacion.estado_tipo_ident;
    this.edit = true;
    this.open(this.modal);
  }
  public borrarTipoIdentificacion(id_tipo_ident: number) {
    const indiceElemento = this.tiposIdentificacion.findIndex(el => el.id_tipo_ident == id_tipo_ident);
    let newTodos = [...this.tiposIdentificacion];
    newTodos[indiceElemento] = { ...newTodos[indiceElemento], estado_tipo_ident: 'I' };
    this.tiposIdentificacion = newTodos;
  }
  public saveTipoIdentificacion() {
    (this.edit ? this.updateTipoIdentificacion() : this.storeTipoIdentificacion());
  }
  public updateTipoIdentificacion() {
    const indiceElemento = this.tiposIdentificacion.findIndex(el => el.id_tipo_ident == this.tipoIdentificacion.id_tipo_ident);
    let newTodos = [...this.tiposIdentificacion];
    newTodos[indiceElemento] = { ...newTodos[indiceElemento], nombre_tipo_ident: this.tipoIdentificacion.nombre_tipo_ident, estado_tipo_ident: this.tipoIdentificacion.estado_tipo_ident };
    this.tiposIdentificacion = newTodos;
    this.limpiar();
    this.modalTipoIdentificacion.dismissAll();

  }
  public storeTipoIdentificacion() {
    this.tiposIdentificacion.push(this.tipoIdentificacion);
    this.limpiar();
    this.modalTipoIdentificacion.dismissAll();
  }
  private limpiar() {
    this.tipoIdentificacion.id_tipo_ident = 0;
    this.tipoIdentificacion.nombre_tipo_ident = "";
    this.tipoIdentificacion.estado_tipo_ident = "";
  }
}
