import { TipoIdentificacionService } from './../../../data/services/api/tipo-identificacion.service';
import { PersonaService } from './../../../data/services/api/persona.service';
import { DireccionService } from './../../../data/services/api/direccion.service';
import { EmpresaService } from './../../../data/services/api/empresa.service';
import { ClienteService } from './../../../data/services/api/cliente.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { IPersona } from './../../../data/interfaces/persona.metadata';
import { ICliente } from './cliente.metadata';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ThisReceiver } from '@angular/compiler';
import Swal from 'sweetalert2';

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
  email:'',
  estado_cli: '',
  id_persona: 0,
  id_empresa: 0,
  id_direccion: 0
}
clientes:any=[];
persona:IPersona={
  id_persona:0,
  nombre_persona:'',
  apellido_persona:'',
  dni:'',
  id_tipo_ident	:0
}
empresas:any = [];
direcciones:any=[];
tiposIdentificacion:any=[];

@ViewChild('clienteModal', { static: false }) modal: ElementRef | undefined;
edit = false;
constructor(private modalCliente: NgbModal,private clienteservice: ClienteService, private empresaservice:EmpresaService, private direccionesservice: DireccionService, private personaservice:PersonaService, private tipoidentificacionservice:TipoIdentificacionService) { }

ngOnInit(): void {
  this.getClientes();
  this.getDireciones();
  this.getEmpresas();
  this.getTipoIdentificaciones();
}
getTipoIdentificaciones() {
  this.tipoidentificacionservice.getallTipoIdentificaciones().subscribe(tiposIdentificacion => this.tiposIdentificacion = tiposIdentificacion);
}
getClientes(){
  this.clienteservice.getallClientes().subscribe(clientes=> this.clientes=clientes);
}
getEmpresas(){
  this.empresaservice.getallEmpresas().subscribe(empresas=> this.empresas=empresas);
}
getDireciones() {
  this.direccionesservice.getallDirecciones().subscribe(direcciones => this.direcciones = direcciones);
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
    this.clienteservice.updateCliente(this.cliente).subscribe((res: any) => {
      this.modalCliente.dismissAll();
      this.getClientes();
      this.limpiar();
      Swal.fire({
        title:'Cliente',
        text:'Cliente Actualizado Exitosamente',
        icon:'success'
      });
    })

  }
  public storeCliente() {

    this.personaservice.savePersonas(this.persona).subscribe((res: any) => {
      this.saveCli(res.id_persona);
 })
  }
  saveCli(id_persona: any) {
    this.cliente.id_persona= id_persona;
    this.clienteservice.saveClñiente(this.cliente).subscribe((res: any) => {
      this.modalCliente.dismissAll();
      this.getClientes();
      this.limpiar();
      Swal.fire({
        title:'Cliente',
        text:'Cliente Creado Exitosamente',
        icon:'success'
      });
    })
  }
  private limpiar(){
    this.cliente.id_cliente = 0;
    this.cliente.tipo_cli = "";
    this.cliente.fecha_inicio = "",
      this.cliente.estado_cli = "";
  }
}
