import { ProductoService } from './../../../data/services/api/producto.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'
import { IProducto } from './producto.metadata'
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core'

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
})
export class ProductoComponent implements OnInit {
  closeResult: string | undefined
  file: any;
  image: any = '../../../../../assets/images/upload.png';
  producto: IProducto = {
    id_prod: 0,
    codigo_prod: '',
    codbarra_prod: '',
    descripcion_prod: '',
    present_prod: '',
    precio_prod: 0,
    stockmin_prod: 0,
    stockmax_prod: 0,
    stock_prod: 0,
    fechaing_prod: '',
    fechaelab_prod: '',
    fechacad_prod: '',
    aplicaiva_prod: '',
    aplicaice_prod: '',
    util_prod: 0,
    comision_prod: 0,
    imagen_prod: '',
    observ_prod: '',
    estado_prod: '',
    id_bod: 0,
    id_marca: 0,
    id_cat: 0,
    id_empresa: 0,
  }
  productos: any = [];

  bodegas = [
    {
      id_prod: 1,
      nombre_bod: 'Bodega 1',
      estado_prod: 'A',
      codbarra_prod: '2222222',
      descripcion_prod: '0999999',
      present_prod: '',
      precio_prod: '2021-08-03',
      stockmin_prod: '2022-08-03',
      id_bod: 1,
      id_marca: 2,
    },
    {
      id_prod: 2,
      nombre_bod: 'Bodega  2',
      estado_prod: 'A',
      codbarra_prod: '2222222',
      descripcion_prod: '099999999',
      present_prod: '',
      precio_prod: '2021-07-03',
      stockmin_prod: '2022-07-03',
      id_bod: 2,
      id_marca: 2,
    },
    {
      id_prod: 3,
      nombre_bod: 'Bodega 3',
      estado_prod: 'A',
      codbarra_prod: '565656565',
      descripcion_prod: '0989898989',
      present_prod: '',
      precio_prod: '2021-08-09',
      stockmin_prod: '2022-08-02',
      id_bod: 1,
      id_marca: 1,
    },
  ]
  marcas = [
    {
      id_marca: 2,
      nomb_marca: 'Marca 2',
      observ_marca: '',
      estado_marca: 'I',
    },
    {
      id_marca: 3,
      nomb_marca: 'Marca 3',
      observ_marca: '',
      estado_marca: 'A',
    },
    {
      id_marca: 4,
      nomb_marca: 'Marca 4',
      observ_marca: '',
      estado_marca: 'A',
    },
  ]
  categorias = [
    {
      id_cat: 1,
      nomb_cat: 'categoria 1',
      observ_cat: '',
      estado_cat: 'I',
    },
    {
      id_cat: 2,
      nomb_cat: 'categoria 2',
      observ_cat: '',
      estado_cat: 'A',
    },
    {
      id_cat: 3,
      nomb_cat: 'categoria 3',
      observ_cat: '',
      estado_cat: 'A',
    },
    {
      id_cat: 4,
      nomb_cat: 'categoria 4',
      observ_cat: '',
      estado_cat: 'A',
    },
    {
      id_cat: 5,
      nomb_cat: 'categoria 5',
      observ_cat: '',
      estado_cat: 'A',
    },
  ]
  empresas = [
    {
      id_empresa: 1,
      razon_social: 'Emp1',
      codigo_envio: 'EMP001',
      nombre_comercial: 'Empresa 1',
      ruc: '074545454545001',
      fecha_inicio: '2021-02-03',
      fecha_fin: '2022-02-03',
    },
    {
      id_empresa: 2,
      razon_social: 'Emp2',
      codigo_envio: 'EMP002',
      nombre_comercial: 'Empresa 2',
      ruc: '074545454545001',
      fecha_inicio: '2021-02-03',
      fecha_fin: '2022-02-03',
    },
    {
      id_empresa: 3,
      razon_social: 'Emp3',
      codigo_envio: 'EMP003',
      nombre_comercial: 'Empresa 3',
      ruc: '074545454545001',
      fecha_inicio: '2021-02-03',
      fecha_fin: '2022-02-03',
    },
  ]
  @ViewChild('productoModal', { static: false }) modal: ElementRef | undefined
  edit = false
  constructor(private modalProducto: NgbModal, private productService: ProductoService) { }

  ngOnInit(): void {
    this.getProductos();
  }
  public onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type.includes('image')) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.image = reader.result;
        }
        this.file = file;
      } else {
        console.log('ha ocurrido un error');
      }
    }
  }
  // Boton para abrir ventana modal
  open(content: any) {
    this.modalProducto
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
  public editProducto(producto: any) {
    this.producto.id_prod = producto.id_prod,
      this.producto.codigo_prod = producto.codigo_prod,
      this.producto.estado_prod = producto.estado_prod,
      this.producto.codbarra_prod = producto.codbarra_prod,
      this.producto.descripcion_prod = producto.descripcion_prod,
      this.producto.present_prod = producto.present_prod,
      this.producto.precio_prod = producto.precio_prod,
      this.producto.stockmin_prod = producto.stockmin_prod,
      this.producto.stockmax_prod = producto.stockmax_prod,
      this.producto.stock_prod = producto.stock_prod,
      this.producto.fechaing_prod = producto.fechaing_prod,
      this.producto.fechaelab_prod = producto.fechaelab_prod,
      this.producto.fechacad_prod = producto.fechacad_prod,
      this.producto.aplicaiva_prod = producto.aplicaiva_prod,
      this.producto.aplicaice_prod = producto.aplicaice_prod,
      this.producto.util_prod = producto.util_prod,
      this.producto.comision_prod = producto.comision_prod,
      this.producto.imagen_prod = producto.imagen_prod,
      this.producto.observ_prod = producto.observ_prod,
      this.producto.id_bod = producto.id_bod,
      this.producto.id_marca = producto.id_marca,
      this.producto.id_cat = producto.id_cat,
      this.producto.id_empresa = producto.id_empresa,
      this.edit = true
    this.open(this.modal)
  }
  public getProductos() {
    this.productService.getallProductos().subscribe(r => { this.productos = r; })
  }
  public borrarProducto(id_prod: number) {
    this.productService.deleteProducto(id_prod).subscribe((res: any) => {
      this.modalProducto.dismissAll();
      this.getProductos();
      this.limpiar();
    })
  }
  public saveProducto() {
    this.edit ? this.updateProducto() : this.storeProducto()
  }
  public updateProducto() {
    this.producto.aplicaiva_prod = this.convertir(this.producto.aplicaiva_prod);
    this.producto.aplicaice_prod = this.convertir(this.producto.aplicaice_prod);
    this.productService.updateProducto(this.producto, this.file).subscribe((res: any) => {
      this.modalProducto.dismissAll();
      this.getProductos();
      this.limpiar();
    })
  }
  public storeProducto() {
    this.producto.aplicaiva_prod = this.convertir(this.producto.aplicaiva_prod);
    this.producto.aplicaice_prod = this.convertir(this.producto.aplicaice_prod);
    this.productService.saveProducto(this.producto, this.file).subscribe((res: any) => {
      this.modalProducto.dismissAll();
      this.getProductos();
      this.limpiar();
    })
  }
  convertir(value: string) {
    if (value) {
      return '1';
    } else {
      return '0';
    }
  }
  private limpiar() {
    this.producto.id_prod = 0
    this.producto.codigo_prod = ''
    this.producto.estado_prod = ''
    this.producto.codbarra_prod = ''
    this.producto.descripcion_prod = ''
    this.producto.present_prod = ''
    this.producto.precio_prod = 0
    this.producto.stockmin_prod = 0
    this.producto.stockmax_prod = 0
    this.producto.stock_prod = 0
    this.producto.fechaing_prod = ''
    this.producto.fechaelab_prod = ''
    this.producto.fechacad_prod = ''
    this.producto.aplicaiva_prod = ''
    this.producto.aplicaice_prod = ''
    this.producto.util_prod = 0
    this.producto.comision_prod = 0
    this.producto.imagen_prod = ''
    this.producto.observ_prod = ''
    this.producto.id_bod = 0
    this.producto.id_cat = 0
    this.producto.id_marca = 0
    this.producto.id_empresa = 0
  }
}
