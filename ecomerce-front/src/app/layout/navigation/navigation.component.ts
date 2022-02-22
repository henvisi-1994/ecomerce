import { CategoriaService } from './../../data/services/api/categoria.service';
import { AuthService } from './../../data/services/api/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private authService: AuthService, private categoriasaservice: CategoriaService) { }
  isAuth = false;
  isempleado: boolean = false;
  categorias: any = [];
  ngOnInit(): void {
    this.isAuth = this.authService.estaLogeado();
    if ((this.authService.tipoUser()) == 'Empleado') {
      this.isempleado = true;
    }
    this.getCategorias()
  }
  getCategorias() {
    this.categoriasaservice.getTopCategoria().subscribe(categorias => this.categorias = categorias);
  }
  logout() {
    localStorage.clear();
    this.isAuth = false;
  }
   pulsar(e:any) {
    if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
alert('enter')
    }
}
}
