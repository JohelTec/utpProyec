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
      this.dataEmails[1].isAnalyzed = true;
      this.dataEmails[1].isPhishing = false;
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
    const status = ['Success','Warning', 'Error'];
    if(email && !email.isAnalyzed && !email.isPhishing){
      return status[1];
    } else if(email && email.isAnalyzed && !email.isPhishing){
      return status[0];
    } else {
      return status[2];
    }
  }

}
