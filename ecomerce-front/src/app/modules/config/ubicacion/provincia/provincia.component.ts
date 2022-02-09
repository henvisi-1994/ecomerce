import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { IProvincia } from './provincia.metadata';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-provincia',
  templateUrl: './provincia.component.html',
  styleUrls: ['./provincia.component.css']
})
export class ProvinciaComponent implements OnInit {
  closeResult: string | undefined;
  provincia:IProvincia={
    id_provincia:0,
    nombre_provincia:'',
    estado_provincia:'',
    id_pais:0
  }
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
  @ViewChild('provinciaModal', { static: false }) modal: ElementRef | undefined;
  edit = false;
  constructor(private modalProvincia: NgbModal) { }

  ngOnInit(): void {
  }
    // Boton para abrir ventana modal
    open(content: any) {
      this.modalProvincia.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
    public editProvincia(provincia: any) {
      this.provincia.id_provincia = provincia.id_provincia;
      this.provincia.nombre_provincia = provincia.nombre_provincia;
      this.provincia.id_pais=provincia.id_pais;
      this.provincia.estado_provincia = provincia.estado_provincia;
      this.edit = true;
      this.open(this.modal);
    }
    public borrarProvincia(id_provincia: number) {
      const indiceElemento = this.provincias.findIndex(el => el.id_provincia == id_provincia);
      let newTodos = [...this.provincias];
      newTodos[indiceElemento] = { ...newTodos[indiceElemento], estado_provincia: 'I' };
      this.provincias = newTodos;
    }
    public saveProvincia() {
      (this.edit ? this.updateProvincia() : this.storeProvincia());
    }
    public updateProvincia() {
      const indiceElemento = this.provincias.findIndex(el => el.id_provincia == this.provincia.id_provincia);
      let newTodos = [...this.provincias];
      newTodos[indiceElemento] = { ...newTodos[indiceElemento], nombre_provincia: this.provincia.nombre_provincia, estado_provincia: this.provincia.estado_provincia };
      this.provincias = newTodos;
      this.limpiar();
      this.modalProvincia.dismissAll();

    }
    public storeProvincia() {
      this.provincias.push(this.provincia);
      this.limpiar();
      this.modalProvincia.dismissAll();
    }
    private limpiar() {
      this.provincia.id_provincia = 0;
      this.provincia.nombre_provincia = "";
      this.provincia.estado_provincia = "";
    }


}
