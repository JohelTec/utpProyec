import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RolService } from '@app/shared/services/rol.service';
import { catchError, filter, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { modalErrorComponent } from '@modals/error/modal.error.component';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-report-client-bussines',
  templateUrl: './report-client-bussines.component.html',
  styleUrls: ['./report-client-bussines.component.scss']
})
export class ReportClientBussinesComponent implements OnInit {
  listRoles: [] = [];
  formAddReportClient: FormGroup;
  showInput: boolean = false;
  showInputEdit: boolean = true;
  idInputEdit: any = null;
  totalInfo: any = null;
  constructor(
    private readonly rolService : RolService,
    private readonly dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getRoles();
    this.initForm();
  }
  getRoles(){
    this.rolService.listRoles().pipe(
      filter(resp => resp.isSuccess),
      map(resp => resp.data)
    ).subscribe(resp => {
      this.listRoles = resp
    })
  }

  initForm(){
    this.formAddReportClient =  new FormGroup({
      name: new FormControl('', Validators.required)
    })
  }

  onFormSubmit(){
    if(this.showInput){
      this.addRolRequest();
    }else if(this.showInputEdit){
      this.editRolRequest();
    }
  }

  editRolRequest(){
    const body = {
      ...this.totalInfo,
      name: this.formAddReportClient.get('name').value
    }
    this.rolService.updateRol(body).pipe(
      filter(resp => resp.isSuccess),
    ).subscribe(resp => {
      // this.listRoles = resp;
      this.formAddReportClient.reset();
      this.openModalError({
        type: 'success',
        message: 'Se agrego el rol'
      });
    })
  }

  addRolRequest(){
   
    this.rolService.addRol(this.formAddReportClient.value).pipe(
      filter(resp => resp.isSuccess),
    ).subscribe(resp => {
      // this.listRoles = resp;
      this.formAddReportClient.reset();
      this.openModalError({
        type: 'success',
        message: 'Se agrego el rol'
      });
    })
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
      this.getRoles();
      this.idInputEdit = null;
    });
  }

  showInputBtn(){
    
    if(this.idInputEdit){
      return;
    }
    this.formAddReportClient.reset()
    this.showInput = !this.showInput
  }

  deleteRol(idRol){
    this.rolService.deleteRol(idRol).pipe(
      filter(resp => resp.isSuccess),
      catchError(() => {
        this.openModalError({
          type: 'error',
          message: 'Ha ocurrido un incoveniente vuelve a intentarlo mas tarde'
        });
        return EMPTY;
      })
    ).subscribe(resp => {
      this.openModalError({
        type: 'success',
        message: 'Se eliminado el rol'
      });
    })
  }

  editRol(rol){
    if(this.idInputEdit){
      this.idInputEdit = null;
      this.totalInfo = null;
    } else {
      this.idInputEdit = rol.id;
      this.totalInfo = rol;
      this.showInput = false;
      this.formAddReportClient.get('name').setValue(rol.name)
    }
    
  }

  cancel(){
    this.getRoles();
    this.idInputEdit = null;
    this.formAddReportClient.reset();
    this.showInput = false;
  }

}
