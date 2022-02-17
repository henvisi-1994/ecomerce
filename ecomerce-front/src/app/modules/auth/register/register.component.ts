import { Router } from '@angular/router';
import { TipoIdentificacionService } from './../../../data/services/api/tipo-identificacion.service';
import { PersonaService } from './../../../data/services/api/persona.service';
import { DireccionService } from './../../../data/services/api/direccion.service';
import { EmpresaService } from './../../../data/services/api/empresa.service';
import { IPersona } from './../../../data/interfaces/persona.metadata';
import { IUserRegister } from './userRegister.metadata';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@data/services/api/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user:IUserRegister={
    id:0,
    email:'',
    password:'',
    tipo_cli: 'Cliente Online',
    fecha_inicio: '',
    fecha_fin: '',
    estado_cli: '',
    id_persona: 0,
    id_empresa: 0,
    id_direccion: 0
  }
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
  constructor(private authService:AuthService,private empresaservice:EmpresaService, private direccionesservice: DireccionService, private personaservice:PersonaService, private tipoidentificacionservice:TipoIdentificacionService,private router: Router) { }

  ngOnInit(): void {
    this.getDireciones();
    this.getEmpresas();
    this.getTipoIdentificaciones();
  }
  getTipoIdentificaciones() {
    this.tipoidentificacionservice.getallTipoIdentificaciones().subscribe(tiposIdentificacion => this.tiposIdentificacion = tiposIdentificacion);
  }
  getEmpresas(){
    this.empresaservice.getallEmpresas().subscribe(empresas=> this.empresas=empresas);
  }
  getDireciones() {
    this.direccionesservice.getallDirecciones().subscribe(direcciones => this.direcciones = direcciones);
  }
  public saveUser() {
    this.personaservice.savePersonas(this.persona).subscribe((res: any) => {
      this.saveUsuario(res.id_persona);
 })

  }
  saveUsuario(id_persona: any) {
    this.user.id_persona=id_persona;
    this.authService.register(this.user).subscribe((res: any) =>{
      localStorage.setItem('token', res.access_token);
      this.router.navigate(['/']);
 })
  }

}
