import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { ICargo } from './cargo.metadata'

@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.css'],
})
export class CargoComponent implements OnInit {
  closeResult: string | undefined
  cargo: ICargo = {
    id_cargo: 0,
    id_emp: '',
    nomb_cargo: '',
    observ_cargo: '',
    estado_cargo: '',
    fechaini_cargo: '',
    fechafin_cargo: '',
  }
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
  ]
  @ViewChild('cargoModal', { static: false }) modal: ElementRef | undefined
  edit = false
  constructor(private modalCargo: NgbModal) {}

  ngOnInit(): void {}
  // Boton para abrir ventana modal
  open(content: any) {
    this.modalCargo
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`
        },
      )
  }
  // Cierra Ventana modal
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC'
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop'
    } else {
      return `with: ${reason}`
    }
  }
  public editCargo(cargo: any) {
    this.cargo.id_cargo = cargo.id_cargo
    this.cargo.nomb_cargo = cargo.nomb_cargo
   this.cargo.observ_cargo = cargo.observ_cargo
   this.cargo.fechaini_cargo=cargo.fechaini_cargo
   this.cargo.fechafin_cargo=cargo.fechafin_cargo
    this.cargo.estado_cargo = cargo.estado_cargo
    this.edit = true
    this.open(this.modal)
  }
  public borrarCargo(id_cargo: number) {
    const indiceElemento = this.cargos.findIndex(
      (el) => el.id_cargo == id_cargo,
    )
    let newTodos = [...this.cargos]
    newTodos[indiceElemento] = {
      ...newTodos[indiceElemento],
      estado_cargo: 'I',
    }
    this.cargos = newTodos
  }
  public saveCargo() {
    this.edit ? this.updateCargo() : this.storeCargo()
  }
  public updateCargo() {
    const indiceElemento = this.cargos.findIndex(
      (el) => el.id_cargo == this.cargo.id_cargo,
    )
    let newTodos = [...this.cargos]
    newTodos[indiceElemento] = {
      ...newTodos[indiceElemento],
      nomb_cargo: this.cargo.nomb_cargo,
      observ_cargo: this.cargo.observ_cargo,
      fechaini_cargo:this.cargo.fechaini_cargo,
      fechafin_cargo:this.cargo.fechafin_cargo,
      estado_cargo: this.cargo.estado_cargo,

    }
    this.cargos = newTodos
    this.limpiar()
    this.modalCargo.dismissAll()
  }
  public storeCargo() {
    this.cargos.push(this.cargo)
    this.limpiar()
    this.modalCargo.dismissAll()
  }
  private limpiar() {
    this.cargo.id_cargo = 0
    this.cargo.nomb_cargo = ''
    this.cargo.observ_cargo = ''
    this.cargo.fechaini_cargo=''
    this.cargo.fechafin_cargo=''
    this.cargo.estado_cargo = ''
  }
}
