import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminService } from '@app/shared/services/admin.service';
import { catchError, filter, map } from 'rxjs/operators';
import { modalErrorComponent } from '@modals/error/modal.error.component';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  formSearch: FormGroup;
  listEmployees: [] = [];
  constructor(
    private readonly router : Router,
    private readonly adminService : AdminService,
    private readonly dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.formSearch = new FormGroup({
      search : new FormControl('')
    }) 
    this.getEmployees();
  }

  onFormSubmit(){

  }

  addNewUser() {
    this.router.navigateByUrl('admin/adduser');
  }
  detailuser() {
    this.router.navigateByUrl('admin/detailuser');
  }
  editaruser(formValue) {
    this.router.navigate(['admin/edituser', formValue ]);
  }

  getEmployees() {
    this.adminService.listEmployees().pipe(
      filter(resp => resp.isSuccess),
      map(resp => resp.data)
    ).subscribe(resp => {
      this.listEmployees = resp;
    });
  }

  deleteEmployee(idEmployee) {
    this.adminService.deleteEmployee(idEmployee).pipe(
      filter(resp => resp.isSuccess),
      catchError(() => {
        this.openModalError({
          type:'error',
          message: 'Ha ocurrido un incoveniente vuelve a intentarlo mas tarde'
        });
        return EMPTY;
      })
    ).subscribe(() => {
      this.openModalError({
        type: 'success',
        message: `Se ha eliminado el empleado`
      })
    })
  }

  activeEmployee(idEmployee, isActive) {
    this.adminService.disabledEmployee(idEmployee, !isActive).pipe(
      filter(resp => resp.isSuccess),
      map(resp => resp.data),
      catchError(() => {
        this.openModalError({
          type:'error',
          message: 'Ha ocurrido un incoveniente vuelve a intentarlo mas tarde'
        });
        return EMPTY;
      })
    ).subscribe(resp => {
      this.openModalError({
        type: 'success',
        message: `Se ha eliminado el empleado`
      })
    });
  }

  openModalError({type, message}): void {
    const dialogRef = this.dialog.open(modalErrorComponent, {
      data: {
        type: type,
        description: message,
      },
      minWidth: 400
    });
    const sub = dialogRef.componentInstance.eventOnNoClick.subscribe(() => {
      this.getEmployees();
    });
  }
}
