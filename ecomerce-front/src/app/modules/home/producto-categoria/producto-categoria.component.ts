import { ActivatedRoute } from '@angular/router';
import { ProductoService } from './../../../data/services/api/producto.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-producto-categoria',
  templateUrl: './producto-categoria.component.html',
  styleUrls: ['./producto-categoria.component.css']
})
export class ProductoCategoriaComponent implements OnInit {
productos:any=[];
  constructor(
    private productService: ProductoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.productService.getProductoCategoria(params.get("id")).subscribe(productos => this.productos = productos);
      }

    })
  }

}
