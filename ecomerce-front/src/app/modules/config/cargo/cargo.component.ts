import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { ICargo } from './cargo.metadata'
import { CargoService } from '@data/services/api/cargo.service'

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
  cargos:any = []
  @ViewChild('cargoModal', { static: false }) modal: ElementRef | undefined
  edit = false
  constructor(private modalCargo: NgbModal, private cargoservice:CargoService) {}

  ngOnInit(): void {
    this.getCargos();
  }
  getCargos() {
    this.cargoservice.getallCargos().subscribe(cargos => this.cargos = cargos);
  }
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
    this.cargoservice.deleteCargo(id_cargo).subscribe((res: any) => {
      this.modalCargo.dismissAll();
      this.getCargos();
      this.limpiar();
    })
  }
  public saveCargo() {
    this.edit ? this.updateCargo() : this.storeCargo()
  }
  public updateCargo() {
    this.cargoservice.updateCargo(this.cargo).subscribe((res: any) => {
      this.modalCargo.dismissAll();
      this.getCargos();
      this.limpiar();
    })
  }
  public storeCargo() {
    this.cargoservice.saveCargo(this.cargo).subscribe((res: any) => {
      this.modalCargo.dismissAll();
      this.getCargos();
      this.limpiar();
    })
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
