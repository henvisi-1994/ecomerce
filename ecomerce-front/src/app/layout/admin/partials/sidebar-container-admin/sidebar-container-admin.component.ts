import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-container-admin',
  templateUrl: './sidebar-container-admin.component.html',
  styleUrls: ['./sidebar-container-admin.component.css']
})
export class SidebarContainerAdminComponent implements OnInit {
user:any;
  constructor() { }

  ngOnInit(): void {
    try {
      let  user = localStorage.getItem('user');
      this.user= JSON.parse(user+'')
    } catch (error) {

    }


  }

}
