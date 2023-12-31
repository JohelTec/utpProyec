import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '@app/shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { SocialAuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { CheckboxRequiredValidator, Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { filter, map, catchError  } from 'rxjs/operators';
import { EMPTY, of, throwError } from 'rxjs';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { modalErrorComponent } from '@modals/error/modal.error.component';
import { UpperCasePipe } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  formGoogle: FormGroup;
  user: SocialUser;
  loggedIn: boolean;
  socialUser: any;
  tabSelected: number = 0;
  showSpinner = false;
  showSpinnerGoogle = false;
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
        if(params && params.code){
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
        this.openModalError({
          type: 'error',
          message: 'Credencailes incorrectas'
        });
        return EMPTY;
      })
    ).subscribe(resp => {
      this.authService.setSesionStorage('dataUser', JSON.stringify(resp))
      this.router.navigateByUrl('user')
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
    
    this.formGoogle = new FormGroup({
      acceptTandC: new FormControl(false, [
        Validators.requiredTrue
      ])
    })
  }

  onFormSubmit(){
    this.showSpinner = true;
    const body = this.form.value;
    this.authService.login(body).pipe(
      filter( resp => resp.isSuccess === true),
      map( resp => resp.data ),
      catchError(() => {
        this.showSpinner = false;
        this.openModalError({
          type: 'error',
          message: 'Vuelve a intentarlo'
        });
        
        return EMPTY;
      })
    ).subscribe(data => {
      this.authService.setSesionStorage('dataUser', JSON.stringify(data));
      if(data && (data.roleName.toUpperCase() === 'ADMINISTRADOR' || data.roleName.toUpperCase() === 'SUPERVISOR') ){
        this.router.navigateByUrl('admin');
        this.showSpinner = false
      } else{
        this.router.navigateByUrl('investigador');
        this.showSpinner = false
      }
    });
  }

  openModalError({type, message}): void {
    const dialogRef = this.dialog.open(modalErrorComponent, {
      data: {
        type: type,
        description: message
      },
      minWidth: 400
    });
  }
  
  loginWithGoogle() {
    if(!this.formGoogle.valid){
      this.openModalError({type : 'error', message: 'Acepta los términos y condiciones'})
    } else {
      this.showSpinnerGoogle = true;
      this.authService.outh2().pipe(
      filter( resp => resp.isSuccess === true),
      map( resp => resp.data ),
      catchError(() => {
        this.openModalError({
          type: 'error',
          message: 'Credencailes incorrectas'
        });
        this.showSpinnerGoogle = false;
        return EMPTY;
      })
      ).subscribe(resp => {
        let reference = window.open(resp, "_parent", '');
        this.showSpinnerGoogle = false;
      });
    }
    
  }

}
