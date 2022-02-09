import { ClienteService } from './../../../data/services/api/cliente.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { IPersona } from './../../../data/interfaces/persona.metadata';
import { ICliente } from './cliente.metadata';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  closeResult: string | undefined;
cliente:ICliente={
  id_cliente: 0,
  tipo_cli: '',
  fecha_inicio: '',
  fecha_fin: '',
  estado_cli: '',
  id_persona: 0,
  id_empresa: 0,
  id_direcion: 0
}
clientes:any=[];
persona:IPersona={
  id_persona:0,
  nombre_persona:'',
  apellido_persona:'',
  dni:'',
}
empresas = [
  {
    id_empresa: 1,
    razon_social: 'Emp1',
    codigo_envio: 'EMP001',
    nombre_comercial: 'Empresa 1',
    ruc: '074545454545001',
    fecha_inicio: '2021-02-03',
    fecha_fin: '2022-02-03',
    estado_empresa: 'A',
  },
  {
    id_empresa: 2,
    razon_social: 'Emp2',
    codigo_envio: 'EMP002',
    nombre_comercial: 'Empresa 2',
    ruc: '074545454545001',
    fecha_inicio: '2021-02-03',
    fecha_fin: '2022-02-03',
    estado_empresa: 'A',
  },
  {
    id_empresa: 3,
    razon_social: 'Emp3',
    codigo_envio: 'EMP003',
    nombre_comercial: 'Empresa 3',
    ruc: '074545454545001',
    fecha_inicio: '2021-02-03',
    fecha_fin: '2022-02-03',
    estado_empresa: 'A',
  },
];
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
@ViewChild('clienteModal', { static: false }) modal: ElementRef | undefined;
edit = false;
constructor(private modalCliente: NgbModal,private clienteservice: ClienteService) { }

ngOnInit(): void {
  this.getClientes();
}
getClientes(){
  this.clienteservice.getallClientes().subscribe(clientes=> this.clientes=clientes);
}
  // Boton para abrir ventana modal
  open(content: any) {
    this.modalCliente.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
  public editCliente(cliente: any) {
    this.cliente.id_cliente = cliente.id_cliente;
    this.cliente.tipo_cli = cliente.tipo_cli;
    this.cliente.fecha_inicio = cliente.fecha_inicio,
    this.cliente.fecha_fin = cliente.fecha_fin,
      this.cliente.estado_cli = cliente.estado_cli;
      this.persona.nombre_persona=cliente.nombre_persona,
      this.persona.apellido_persona=cliente.apellido_persona,
      this.persona.dni=cliente.dni;
    this.edit = true;
    this.open(this.modal);
  }
  public borrarCliente(id_cliente: number) {

  }
  public saveCliente() {
    (this.edit ? this.updateCliente() : this.storeCliente());
  }
  public updateCliente() {
    this.limpiar();
    this.modalCliente.dismissAll();

  }
  public storeCliente() {

    this.limpiar();
    this.modalCliente.dismissAll();
  }
  private limpiar(){
    this.cliente.id_cliente = 0;
    this.cliente.tipo_cli = "";
    this.cliente.fecha_inicio = "",
      this.cliente.estado_cli = "";
  }
}
