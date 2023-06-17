import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Subscriber, Subscription } from 'rxjs';
import { RolService } from '@app/shared/services/rol.service';
import { AdminService } from '@app/shared/services/admin.service';
import { catchError, filter, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { modalErrorComponent } from '@modals/error/modal.error.component';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.scss']
})
export class DetailUserComponent implements OnInit {
  formAddUser: FormGroup;
  sub: Subscription;
  view: string;
  dataArraySexo = [
    {
      value: 'Masculino',
      key: 'male'
    },
    {
      value: 'Femenino',
      key: 'female'
    }
  ];
  dataArrayRoles = [];
  dataArrayStatus = [
    {
      value: 'Activo',
      key: true
    },
    {
      value: 'Inactivo',
      key: false
    }
  ];
  dataArrayGender = [
    {
      value: 'Hombre',
      key: 1
    },
    {
      value: 'Mujer',
      key: 0
    }
  ];
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly rolService: RolService,
    private readonly adminService: AdminService,
    private readonly dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.sub = this.route
      .data
      .subscribe(item => {
        this.view = item.view;
      });


    this.formAddUser = new FormGroup({
      name: new FormControl('', Validators.required),
      secondLastName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      roleId: new FormControl('842b6718-ea49-49ee-a24b-c59befad804c', Validators.required),
      email: new FormControl('',  [
        Validators.email,
        Validators.required, 
      ]),
      isActive: new FormControl(true, Validators.required),
      gender: new FormControl(1, Validators.required),
    });
    this.getToles()
    this.setValueInitForm();
  }

  setValueInitForm() {
    if(this.route.snapshot.paramMap.get('name')){
      this.formAddUser.get('name').setValue(this.route.snapshot.paramMap.get('name'));
    }
    if(this.route.snapshot.paramMap.get('lastName')){
      this.formAddUser.get('lastName').setValue(this.route.snapshot.paramMap.get('lastName'));
    }
    if(this.route.snapshot.paramMap.get('secondLastName')){
      this.formAddUser.get('secondLastName').setValue(this.route.snapshot.paramMap.get('secondLastName'));
    }
    if(this.route.snapshot.paramMap.get('roleId')){
      this.formAddUser.get('roleId').setValue(this.route.snapshot.paramMap.get('roleId'));
    }
    if(this.route.snapshot.paramMap.get('email')){
      this.formAddUser.get('email').setValue(this.route.snapshot.paramMap.get('email'));
    }
    if(this.route.snapshot.paramMap.get('gender')){
      this.formAddUser.get('gender').setValue(Number(this.route.snapshot.paramMap.get('gender')));
    }
    if(this.route.snapshot.paramMap.get('isActive') === 'true'){
      this.formAddUser.get('isActive').setValue(true);
    } else if(this.route.snapshot.paramMap.get('isActive') === 'false') {
      this.formAddUser.get('isActive').setValue(false);
    }
  }

  cancel(){
    this.router.navigateByUrl('admin')
  }

  onFormSubmit() {
    if(this.view === 'add'){
      this.resquestAdd();
    } else  if(this.view === 'edit'){
      this.resquestEdit();
    }
  
  }

  resquestAdd(){
    const body = this.formAddUser.value
    this.adminService.addEmployee(body).pipe(
      filter(resp => resp.isSuccess),
      map(resp => resp.data),
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
        message: 'Se agregado el empleado'
      })
    })
    console.log(' this.formAddUser.value',  this.formAddUser.value)
  }

  resquestEdit(){
    const body = {
      ...this.formAddUser.value,
      id : this.route.snapshot.paramMap.get('id')
    }
    this.adminService.editEmployee(body).pipe(
      filter(resp => resp.isSuccess),
      map(resp => resp.data),
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
        message: 'Se editadi el empleado'
      })
    })
  }

  getToles() {
    this.rolService.listRoles().pipe(
      filter(resp => resp.isSuccess),
      map(resp => resp.data)
    ).subscribe(resp => {
      this.dataArrayRoles = resp.map( item => {
        return {
          key: item.id,
          value: item.normalizedName
        }
      })
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
      this.cancel();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getErrorMessage() {
    if (this.formAddUser.get('name').hasError('required')) {
      return 'You must enter a value';
    }

    return this.formAddUser.get('name').hasError('email') ? 'Not a valid email' : '';
  }
}
