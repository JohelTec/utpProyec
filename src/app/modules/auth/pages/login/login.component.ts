import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '@app/shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { SocialAuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { filter, map, catchError  } from 'rxjs/operators';
import { EMPTY, of, throwError } from 'rxjs';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { modalErrorComponent } from '@modals/error/modal.error.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  user: SocialUser;
  loggedIn: boolean;
  socialUser: any;
  tabSelected: number = 0;
  constructor(
    private authService: AuthService,
    private readonly store: Store<any>,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.listenigLogin()
  }

  listenigLogin(){
    this.route.queryParams
      .subscribe(params => {
        console.log(params); // { orderby: "price" }
        console.log(params.code); // price
        if(params && params.code){
          console.log("params.code",params.code)
          this.getOuthToken(params.code);
        }
      }
    );
  }

  getOuthToken(code){
    this.authService.outh2Token(code).pipe(
      filter( resp => resp.isSuccess),
      map( resp => resp.data ),
      catchError(() => {
        this.openModalError('Error vuelva a intentarlo');
        return EMPTY;
      })
    ).subscribe(resp => {
      this.initSession();
      console.log("resp", resp)
    });
  }

  initSession(){
    this.authService.getSession('uexternalapp@gmail.com', 10).pipe(
      filter( resp => resp.isSuccess),
      map( resp => resp.data ),
      catchError(() => {
        this.openModalError('Error vuelva a intentarlo');
        return EMPTY;
      })
    ).subscribe(resp => {
      console.log("initSession", resp)
    });
  }

  initForm(){
    this.form = new FormGroup({
        email: new FormControl('', [
          Validators.required, Validators.email
        ]),
        password: new FormControl('', [
          Validators.required
        ]),
    });
  }

  login(){
    
  }
  


  signOut(): void {
    // this.socialAuthService.signOut();
  }
  onFormSubmit(){
    const body = this.form.value;
    this.authService.login(body).pipe(
      filter( resp => resp.isSuccess === true),
      map( resp => resp.data ),
      catchError(() => {
        this.openModalError();
        return EMPTY;
      })
    ).subscribe(data => {
      this.authService.setSesionStorage('dataUser', JSON.stringify(data));
      if(data.roleName === 'Administrador'){
        this.router.navigateByUrl('admin');
      } else{
        this.router.navigateByUrl('investigador');
      }
    });
  }

  openModalError(message= 'Credencailes incorrectas'): void {
    const dialogRef = this.dialog.open(modalErrorComponent, {
      data: {
        type: 'error',
        description: message
      },
      minWidth: 400
    });
  }
  
  loginWithGoole() {
    this.authService.outh2().pipe(
      filter( resp => resp.isSuccess === true),
      map( resp => resp.data ),
      catchError(() => {
        this.openModalError();
        return EMPTY;
      })
    ).subscribe(resp => {
      const windowFeatures = "left=100,top=100,width=320,height=320";
      let params = `titlebar=yes,toolbar=yes,location=yes,status=no,menubar=yes,scrollbars=yes,resizable=yes,width=700,Height=300,left=0,top=0`;
      window.open(resp, windowFeatures);
    });
  }

}
