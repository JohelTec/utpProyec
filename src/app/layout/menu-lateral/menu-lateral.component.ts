import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { rols } from './menu-lateral.constant';
import { AuthService } from '@app/shared/services/auth.service';

interface user {
  email: string
  id: string
  roleName: string
  token: string
  userName : string
}

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss']
})
export class MenuLateralComponent implements OnInit {
  path: string;
  rol : number = 1;
  user: user;
  constructor(
    private readonly router:Router,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initRol();
  }

  initRol(){
    const dataUser = this.authService.getSesionStorage('dataUser');
    if(dataUser !== null){
      this.user = JSON.parse(dataUser);
      this.rol = rols.find( item => item.name ==  this.user.roleName).key
    }
  }

  public logo(){
    this.router.navigateByUrl('/admin')
  }

  goto(path){
    this.router.navigateByUrl(path)
    this.path = path
  }

  closeSession(){
    this.authService.removeSesionStorage('dataUser')
    this.router.navigateByUrl('/');
  }

}
