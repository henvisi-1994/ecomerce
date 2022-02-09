import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { IPais } from './pais.metadata';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.css']
})
export class PaisComponent implements OnInit {
  closeResult: string | undefined;
  pais: IPais = {
    id_pais: 0,
    nombre_pais: '',
    estado_pais: '',
  }
  paises = [{
    id_pais: 1,
    nombre_pais: 'Ecuador',
    estado_pais: 'A',
  },
  {
    id_pais: 2,
    nombre_pais: 'Colombia',
    estado_pais: 'A',
  },
  {
    id_pais: 3,
    nombre_pais: 'Peru',
    estado_pais: 'A',
  }];
  @ViewChild('paisModal', { static: false }) modal: ElementRef | undefined;
  edit = false;
  constructor(private modalPais: NgbModal) { }

  ngOnInit(): void {
  }
  // Boton para abrir ventana modal
  open(content: any) {
    this.modalPais.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
  public editPais(pais: any) {
    this.pais.id_pais = pais.id_pais;
    this.pais.nombre_pais = pais.nombre_pais;
    this.pais.estado_pais = pais.estado_pais;
    this.edit = true;
    this.open(this.modal);
  }
  public borrarPais(id_pais: number) {
    const indiceElemento = this.paises.findIndex(el => el.id_pais == id_pais);
    let newTodos = [...this.paises];
    newTodos[indiceElemento] = { ...newTodos[indiceElemento], estado_pais: 'I' };
    this.paises = newTodos;
  }
  public savePais() {
    (this.edit ? this.updatePais() : this.storePais());
  }
  public updatePais() {
    const indiceElemento = this.paises.findIndex(el => el.id_pais == this.pais.id_pais);
    let newTodos = [...this.paises];
    newTodos[indiceElemento] = { ...newTodos[indiceElemento], nombre_pais: this.pais.nombre_pais, estado_pais: this.pais.estado_pais };
    this.paises = newTodos;
    this.limpiar();
    this.modalPais.dismissAll();

  }
  public storePais() {
    this.paises.push(this.pais);
    this.limpiar();
    this.modalPais.dismissAll();
  }
  private limpiar() {
    this.pais.id_pais = 0;
    this.pais.nombre_pais = "";
    this.pais.estado_pais = "";
  }

}
