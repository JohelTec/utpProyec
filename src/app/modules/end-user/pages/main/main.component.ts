import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@app/shared/services/auth.service';
import { catchError, filter, map } from 'rxjs/operators';
import { modalErrorComponent } from '@modals/error/modal.error.component';
import { EMPTY } from 'rxjs';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  dataEmails: any = [];
  showSpinner = true;
  constructor(
    private readonly authService: AuthService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.init()
  }

  init() {
    this.getEmails();
  }

  getEmails() {
    this.showSpinner = false;
    this.authService.getEmails('uexternalapp@gmail.com', 10).pipe(
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
      this.dataEmails=resp;
      this.dataEmails[0].isAnalyzed = true;
      this.dataEmails[0].isPhishing = true;
      // this.dataEmails[0].isDeletedMessage = true;
      this.dataEmails[1].isAnalyzed = true;
      this.dataEmails[1].isPhishing = false;
      this.showSpinner = true;
      console.log("this.dataEmails", this.dataEmails)
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

  getStatusEmail(email){
    const status = ['Success','Warning', 'Error', 'Delete'];
    if(email && !email.isAnalyzed && !email.isPhishing && !email.isDeletedMessage){
      console.log("status[1]")
      return status[1];
    } else if(email && email.isAnalyzed && !email.isPhishing && !email.isDeletedMessage){
      return status[0];
    } else if(email.isDeletedMessage){
      return status[3];
    } else {
      return status[2];
    }
  }

  analyzeEmail(email){
    const body = {
      email: 'uexternalapp@gmail.com',
      messageId: email.messageId
    };
    this.authService.analizeEmail(body).pipe(
      filter( resp => resp.isSuccess),
      catchError(() => {
        this.openModalError({
          type: 'error',
          message: 'Vuelve a intentarlo'
        });
        return EMPTY;
      })
    ).subscribe(resp => {
      
      this.openModalError({
        type: 'success',
        message: 'Se ha analizado el correo exitosamente'
      });
      this.getEmails();
    });
  }

  removeEmail(email){
    this.authService.removeEmail('uexternalapp@gmail.com', email.messageId).pipe(
      filter( resp => resp.isSuccess),
      catchError(() => {
        this.openModalError({
          type: 'error',
          message: 'Vuelve a intentarlo'
        });
        return EMPTY;
      })
    ).subscribe(resp => {
      
      this.openModalError({
        type: 'success',
        message: 'Se ha elminado el correo exitosamente'
      });
      this.getEmails();
    });
  }

}
