import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CarShopComponent } from './car-shop/car-shop.component';



@NgModule({
  declarations: [
    HomeComponent,
    ProductDetailComponent,
    CarShopComponent
  ],
  imports: [
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
