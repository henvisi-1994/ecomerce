import { BodegaService } from './../../../data/services/api/bodega.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IBodega } from './bodega.metadata';

@Component({
  selector: 'app-bodega',
  templateUrl: './bodega.component.html',
  styleUrls: ['./bodega.component.css']
})
export class BodegaComponent implements OnInit {
  closeResult: string | undefined;
  bodega:IBodega={
    id_bod:0,
    nombre_bod:'',
    estado_bod:'',
    telef_bod:'',
    cel_bod:'',
    nomb_contac_bod:'',
    fechaini_bod:'',
    fechafin_bod:'',
    id_ciudad:1,
    id_direcion:1,
  };
  bodegas:any=[];
  ciudades=[{
    id_ciudad:1,
    nombre_ciudad:'Machala',
    id_provincia:1
  },
  {
    id_ciudad:2,
    nombre_ciudad:'Pasaje',
    id_provincia:1
  },
  {
    id_ciudad:3,
    nombre_ciudad:'El Guabo',
    id_provincia:1
  }];
  direcciones=[{
    id_direcion:1,
    direcion:'direcion 1',
    calle:'Calle 1',
    numero:'3ra',
    piso:'tercero',
    telefono:'4545454454',
    movil:'09565656565',
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
    id_ciudad:1
  }];
  @ViewChild('bodegaModal', { static: false }) modal: ElementRef | undefined;
  edit = false;
  constructor(private modalBodega: NgbModal,private bodegaservice: BodegaService) { }

  ngOnInit(): void {
    this.getBodegas();
  }
  getBodegas(){
    this.bodegaservice.getallBodegas().subscribe(bodegas=> this.bodegas=bodegas);
  }
  // Boton para abrir ventana modal
  open(content: any) {
    this.modalBodega.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
  public editBodega(bodega: any) {
    this.bodega.id_bod = bodega.id_bod;
    this.bodega.nombre_bod = bodega.nombre_bod;
    this.bodega.estado_bod = bodega.estado_bod,
      this.bodega.telef_bod = bodega.telef_bod;
      this.bodega.cel_bod = bodega.cel_bod;
      this.bodega.nomb_contac_bod = bodega.nomb_contac_bod;
      this.bodega.fechaini_bod = bodega.fechaini_bod;
      this.bodega.fechafin_bod = bodega.fechafin_bod;
      this.bodega.id_ciudad = bodega.id_ciudad;
      this.bodega.id_direcion = bodega.id_direcion;
    this.edit = true;
    this.open(this.modal);
  }
  public borrarBodega(id_bod: number) {

  }
  public saveBodega() {
    (this.edit ? this.updateBodega() : this.storeBodega());
  }
  public updateBodega() {

    this.limpiar();
    this.modalBodega.dismissAll();

  }
  public storeBodega() {
    this.bodegas.push(this.bodega);
    this.limpiar();
    this.modalBodega.dismissAll();
  }
  private limpiar(){
    this.bodega.id_bod = 0;
    this.bodega.nombre_bod ='';
    this.bodega.estado_bod = '',
      this.bodega.telef_bod = '';
      this.bodega.cel_bod = '';
      this.bodega.nomb_contac_bod ='';
      this.bodega.fechaini_bod = '';
      this.bodega.fechafin_bod = '';
      this.bodega.id_ciudad = 0;
      this.bodega.id_direcion = 0;
  }

}
