import { ProductoService } from './../../../data/services/api/producto.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
producto:any;
  constructor(
    private productService: ProductoService,
    private route:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      if (params.has('id')) {
        this.productService.getProducto(params.get("id")).subscribe(producto =>this.producto=producto);

      }

    })

  }

}
