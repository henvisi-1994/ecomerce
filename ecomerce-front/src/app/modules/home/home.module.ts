import { ChatDialogComponent } from './chat-dialog/chat-dialog.component';
import { SharedModule } from './../../shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CarShopComponent } from './car-shop/car-shop.component';




@NgModule({
  declarations: [
    HomeComponent,
    ProductDetailComponent,
    CarShopComponent,
    ChatDialogComponent
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],

  imports: [
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
