import { IUser } from './../../user/user/user.metadata';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@data/services/api/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user:IUser={
    id:0,
    name:'',
    email:'',
    password:''
  }
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }
  public saveUser() {
    this.authService.register(this.user).subscribe((res: any) =>{
          console.log(res)
     })
  }

}
