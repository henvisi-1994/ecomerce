import { AuthService } from '@data/services/api/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) : boolean{
    if (this.authService.estaLogeado()) {
      return true;
    } else {
      this.router.navigate(['login'],{
        queryParams:{returnUrl: state.url}
      });
      return false;
    }

  }

}
