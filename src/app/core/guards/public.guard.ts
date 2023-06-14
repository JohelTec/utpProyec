import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@app/shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.getSesionStorage('dataUser')) {
      if(JSON.parse(this.authService.getSesionStorage('dataUser')).roleName ==='Administrador'){
        return this.router.navigateByUrl('/admin').then(() => false);
      }else {
        return this.router.navigateByUrl('/investigador').then(() => false);
      }
      
    }
    return true ;
  }
  
}
