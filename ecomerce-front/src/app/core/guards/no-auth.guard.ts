import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@data/services/api/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) : boolean{
    if (this.authService.estaLogeado()) {
      this.router.navigate(['admin'],{
        queryParams:{returnUrl: state.url}
      });
      return false;
    } else {
      return true;
    }

  }


}
