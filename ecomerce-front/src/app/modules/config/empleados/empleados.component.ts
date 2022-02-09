import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { IPersona } from './../../../data/interfaces/persona.metadata';
import { IEmpleado } from './empleado.metadata';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  closeResult: string | undefined;
  empleado:IEmpleado={
    id_empleado:0,
    id_emp:0,
    id_usu:0,
    id_cargo:0,
     id_per:0,
    estado_empl:''
  }
  persona:IPersona={
    id_persona:0,
    nombre_persona:'',
    apellido_persona:'',
    dni:'',
  }
  empleados=[
    {
      id_empleado:1,
      id_emp:1,
      id_usu:1,
      id_cargo:1,
       id_per:1,
      estado_empl:'A',
      nombre_persona:'Juan',
      apellido_persona:'Perez',
      nomb_cargo:'Cajero',
      dni:'',
    },
    {
      id_empleado:2,
      id_emp:1,
      id_usu:1,
      id_cargo:1,
       id_per:1,
      estado_empl:'A',
      nombre_persona:'Rosa',
      apellido_persona:'Alvarez',
      nomb_cargo:'Gerente',
      dni:'',
    }
  ];
  cargos = [
    {
      id_cargo: 1,
      id_emp: '',
      nomb_cargo: 'Cargo 1',
      observ_cargo: '',
      estado_cargo: 'A',
      fechaini_cargo: '',
      fechafin_cargo: '',
    },
    {
      id_cargo: 2,
      id_emp: '',
      nomb_cargo: 'Cargo 2',
      observ_cargo: '',
      estado_cargo: 'A',
      fechaini_cargo: '',
      fechafin_cargo: '',
    },
    {
      id_cargo: 3,
      id_emp: '',
      nomb_cargo: 'Cargo 3',
      observ_cargo: '',
      estado_cargo: 'A',
      fechaini_cargo: '',
      fechafin_cargo: '',
    },
  ];
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
  @ViewChild('empleadoModal', { static: false }) modal: ElementRef | undefined;
  edit = false;
  constructor(private modalEmpleado: NgbModal) { }

  ngOnInit(): void {
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
      this.empleado.id_empleado = empleado.id_empleado;
      this.empleado.id_emp = empleado.id_emp;
      this.empleado.id_usu = empleado.id_usu,
      this.empleado.id_cargo = empleado.id_cargo,
      this.empleado.id_per = empleado.id_per,
      this.persona.nombre_persona=empleado.nombre_persona,
      this.persona.apellido_persona=empleado.apellido_persona,
      this.persona.dni=empleado.dni;
        this.empleado.estado_empl = empleado.estado_empl;
      this.edit = true;
      this.open(this.modal);
    }
    public borrarEmpleado(id_empleado: number) {
      const indiceElemento = this.empleados.findIndex(el => el.id_empleado ==id_empleado);
      let newTodos = [...this.empleados];
      newTodos[indiceElemento] = {...newTodos[indiceElemento], estado_empl:'I'};
      this.empleados = newTodos;
    }
    public saveEmpleado() {
      (this.edit ? this.updateEmpleado() : this.storeEmpleado());
    }
    public updateEmpleado() {

      this.limpiar();
      this.modalEmpleado.dismissAll();

    }
    public storeEmpleado() {
      this.limpiar();
      this.modalEmpleado.dismissAll();
    }
    private limpiar(){
      this.empleado.id_empleado = 0;
      this.empleado.id_emp = 0;
      this.empleado.id_usu =0,
      this.empleado.id_cargo = 0,
      this.empleado.id_per = 0,
      this.persona.nombre_persona='',
      this.persona.apellido_persona='',
      this.persona.dni='';
        this.empleado.estado_empl = '';
    }

}
