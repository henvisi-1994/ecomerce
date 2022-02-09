import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { IUser } from './user.metadata';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  closeResult: string | undefined;
user:IUser={
  id:0,
  name:'',
  email:'',
  password:''
}
users=[{
  id:1,
  name:'henvis1',
  email:'henvisi1994@gmail.com',
},
{
  id:2,
  name:'jperez',
  email:'jperez@gmail.com',
}];
@ViewChild('userModal', { static: false }) modal: ElementRef | undefined;
edit = false;
constructor(private modalUser: NgbModal) { }

  ngOnInit(): void {
  }
  // Boton para abrir ventana modal
  open(content: any) {
    this.modalUser.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
  public editUser(user: any) {
    this.user.id = user.id;
    this.user.name = user.name;
    this.user.email = user.email,
    this.edit = true;
    this.open(this.modal);
  }
  public borrarUser(id: number) {

  }
  public saveUser() {
    (this.edit ? this.updateUser() : this.storeUser());
  }
  public updateUser() {
    const indiceElemento = this.users.findIndex(el => el.id == this.user.id );
    let newTodos = [...this.users];
    newTodos[indiceElemento] = {...newTodos[indiceElemento], name: this.user.name, email:this.user.email};
    this.users = newTodos;
    this.limpiar();
    this.modalUser.dismissAll();

  }
  public storeUser() {
    this.users.push(this.user);
    this.limpiar();
    this.modalUser.dismissAll();
  }
  private limpiar(){
    this.user.id = 0;
    this.user.name = "";
    this.user.email = ""
  }

}
