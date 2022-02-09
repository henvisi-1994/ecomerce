import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { SkeletonComponent } from './layout/skeleton/skeleton.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { SkeletonAdminComponent } from './layout/admin/skeleton-admin/skeleton-admin.component';
import { NavigationAdminComponent } from './layout/admin/partials/navigation-admin/navigation-admin.component';
import { FooterAdminComponent } from './layout/admin/partials/footer-admin/footer-admin.component';
import { SidebarContainerAdminComponent } from './layout/admin/partials/sidebar-container-admin/sidebar-container-admin.component';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    SkeletonComponent,
    FooterComponent,
    NavigationComponent,
    SkeletonAdminComponent,
    NavigationAdminComponent,
    FooterAdminComponent,
    SidebarContainerAdminComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
