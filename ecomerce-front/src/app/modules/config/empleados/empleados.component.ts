import { CargoService } from '@data/services/api/cargo.service';
import { EmpresaService } from './../../../data/services/api/empresa.service';
import { PersonaService } from './../../../data/services/api/persona.service';
import { EmpleadoService } from './../../../data/services/api/empleado.service';
import { TipoIdentificacionService } from './../../../data/services/api/tipo-identificacion.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { IPersona } from './../../../data/interfaces/persona.metadata';
import { IEmpleado } from './empleado.metadata';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
import { environment } from 'environments/environment.prod';
import { UsuarioService } from '@data/services/api/usuario.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  closeResult: string | undefined;
  empleado:IEmpleado={
    id_empleado:0,
    id_empresa: environment.id_empresa,
    id_usu:0,
    id_cargo:0,
     id_persona:0,
    estado_empl:'',
    email:''
  }
  persona:IPersona={
    id_persona:0,
    nombre_persona:'',
    apellido_persona:'',
    dni:'',
    id_tipo_ident	:0
  }
  empleados:any=[];
  cargos:any = [];
  empresas:any = [];
  tiposIdentificacion:any=[];
  @ViewChild('empleadoModal', { static: false }) modal: ElementRef | undefined;
  edit = false;
  users: any=[];
  constructor(private modalEmpleado: NgbModal,
    private cargoservice: CargoService,
    private empresaservice:EmpresaService,
    private personaservice:PersonaService,
    private empleadoService: EmpleadoService ,
    private tipoidentificacionservice:TipoIdentificacionService,
    private userservice:UsuarioService) { }

  ngOnInit(): void {
    this.getEmpleados();
    this.getTipoIdentificaciones();
    this.geEmpresas();
    this.getCargos();
    this.getUsers();
  }
  getTipoIdentificaciones() {
    this.tipoidentificacionservice.getallTipoIdentificaciones().subscribe(tiposIdentificacion => this.tiposIdentificacion = tiposIdentificacion);
  }
  getEmpleados() {
    this.empleadoService.getallEmpleadoes().subscribe(empleados => this.empleados = empleados);
  }
  geEmpresas(){
    this.empresaservice.getallEmpresas().subscribe(empresas=> this.empresas=empresas);
  }
  getCargos() {
    this.cargoservice.getallCargos().subscribe(cargos => this.cargos = cargos);
  }
  getUsers(){
    this.userservice.getallUsuarios().subscribe(users => this.users = users);
  }
    // Boton para abrir ventana modal
    open(content: any) {
      this.modalEmpleado.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
    public editEmpleado(empleado: any) {
      let resultUser = this.users.filter((usuario: string | any) => {
        return usuario.id === empleado.id_usu;
      });
      console.log(resultUser);
      let usuario = resultUser[0];
      this.empleado.id_empleado = empleado.id_empleado;
      this.empleado.id_empresa = empleado.id_empresa;
      this.empleado.id_usu = empleado.id_usu,
      this.empleado.id_cargo = empleado.id_cargo,
      this.empleado.id_persona = empleado.id_persona,
      this.empleado.email= usuario.email;
      this.persona.nombre_persona=empleado.nombre_persona,
      this.persona.apellido_persona=empleado.apellido_persona,
      this.persona.id_tipo_ident= empleado.id_tipo_ident;
      this.persona.dni=empleado.dni;
        this.empleado.estado_empl = empleado.estado_empl;
      this.edit = true;
      this.open(this.modal);
    }
    public borrarEmpleado(id_empleado: number) {

    }
    public saveEmpleado() {
      (this.edit ? this.updateEmpleado() : this.storeEmpleado());
    }
    public updateEmpleado() {
      this.personaservice.updatePersona(this.persona).subscribe((res: any) => {
        this.actualizarEmpleado();
      });
    }
    public actualizarEmpleado(){
      this.empleadoService.updateEmpleado(this.empleado).subscribe((res: any) => {
        this.limpiar();
        this.modalEmpleado.dismissAll();
        Swal.fire({
          title:'Empleado',
          text:'Empleado Actualizado Exitosamente',
          icon:'success'
        });
      })
    }
    public storeEmpleado() {
      this.personaservice.savePersonas(this.persona).subscribe((res: any) => {
           this.saveEmpl(res.id_persona);
      })
    }
  saveEmpl(id_persona: number) {
    this.empleado.id_persona= id_persona;
    this.empleadoService.saveEmpleado(this.empleado).subscribe((res: any) => {
      this.modalEmpleado.dismissAll();
      this.getEmpleados();
      this.limpiar();
      Swal.fire({
        title:'Empleado',
        text:'Empleado Creado Exitosamente',
        icon:'success'
      });
    })
  }
    private limpiar(){
      this.empleado.id_empleado = 0;
      this.empleado.id_empresa = 0;
      this.empleado.id_usu =0,
      this.empleado.id_cargo = 0,
      this.empleado.id_persona = 0,
      this.persona.nombre_persona='',
      this.persona.apellido_persona='',
      this.persona.dni='';
        this.empleado.estado_empl = '';
        this.empleado.email='';
    }

}
