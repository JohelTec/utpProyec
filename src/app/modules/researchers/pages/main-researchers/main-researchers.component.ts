import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@app/shared/services/auth.service';
import xlsx from "json-as-xlsx";
import { filter, map } from 'rxjs/operators';
import { modalErrorComponent } from '@modals/error/modal.error.component';
@Component({
  selector: 'app-main-researchers',
  templateUrl: './main-researchers.component.html',
  styleUrls: ['./main-researchers.component.scss'],
})
export class MainResearchersComponent implements OnInit {
  formfilter: FormGroup;
  dataReport: any = [];
  spinnerReport = false;
  data = [
    {
      sheet: "Casos reportados",
      columns: [
        { label: "Código", value: "codigo" }, // Top level data
        { label: "Emisor", value: "emisor" }, // Top level data
        { label: "Receptor", value: "receptor" }, // Top level data
        { label: "Asunto", value: "asunto" }, // Top level data
        { label: "Mensaje", value: "mensaje" }, // Top level 
        { label: "Fecha", value: "fecha" }, // Top level data
        // { label: "Age", value: (row) => row.age + " years" }, // Custom format
        // { label: "Phone", value: (row) => (row.more ? row.more.phone || "" : "") }, // Run functions
      ],
      content: [
        { user: "Andrea", age: 20, more: { phone: "11111111" } },
        { user: "Luis", age: 21, more: { phone: "12345678" } },
      ],
    },
    // {
    //   sheet: "Children",
    //   columns: [
    //     { label: "User", value: "user" }, // Top level data
    //     { label: "Age", value: "age", format: '# "years"' }, // Column format
    //     { label: "Phone", value: "more.phone", format: "(###) ###-####" }, // Deep props and column format
    //   ],
    //   content: [
    //     { user: "Manuel", age: 16, more: { phone: 9999999900 } },
    //     { user: "Ana", age: 17, more: { phone: 8765432135 } },
    //   ],
    // },
  ];

  settings = {
    fileName: "MySpreadsheet", // Name of the resulting spreadsheet
    extraLength: 3, // A bigger number means that columns will be wider
    writeMode: "writeFile", // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
    writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
    RTL: false, // Display the columns from right-to-left (the default value is false)
  }
  constructor(
    private readonly authService: AuthService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    
    this.formfilter = new FormGroup({
      from: new FormControl(new Date(2023, 5, 1), Validators.required),
      to: new FormControl(new Date(2023, 5, 30), Validators.required),
    })
    this.init()
    
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

  init() {
    this.getReports();
  }

  onFormSubmit() {
    if(this.formfilter.valid) {
      this.getReports();
    }
  }
  
  getReports() {
    const body = {
      email: 'uexternalapp@gmail.com',
      startDate: this.formfilter.get('from').value,
      endDate: this.formfilter.get('to').value
    };
    const email = JSON.parse(this.authService.getSesionStorage('dataUser')).email
    this.authService.reportedCases(body).pipe(
      filter( resp => resp.isSuccess === true),
      map( resp => resp.data )
    ).subscribe(resp => {
      this.dataReport = resp;
    })
  }

  exportExcel(){
    this.spinnerReport = true;
    const resportDataExcel = [
      {
        sheet: "Casos reportados",
        columns: [
          { label: "Emisor", value: "emisor" }, // Top level data
          { label: "Receptor", value: "receptor" }, // Top level data
          { label: "Asunto", value: "asunto" }, // Top level data
          { label: "Mensaje", value: "mensaje" }, // Top level 
          { label: "Fecha", value: "fecha" }, // Top level data
          { label: "Estado", value: "estado" }, // Top level 
          { label: "Porcentaje", value: "porcentaje" }, // Top level data
          { label: "Fecha de análisis", value: "fechaDeAnalisis" }, // Top level data
          { label: "Ejecutivo", value: "ejecutivo" }, // Top level 
          { label: "Correo", value: "correo" }, // Top level data
        ],
        content: this.dataReport.map( item => {
            return {
              codigo: item.historyId,
              emisor: item.from,
              receptor: item.to,
              asunto: item.subject,
              mensaje: item.snippet,
              fecha: item.dateMessage,
              estado: this.getStatusEmailName(item),
              porcentaje: item.score,
              fechaDeAnalisis: item.dateAnalyzed,
              ejecutivo: item.bankingExecutive_Name,
              correo: item.bankingExecutive_Email,
            }
        })
      },
    ];
    let callback = function (sheet) {
      this.spinnerReport = false;
      this.openModalError({
        type: 'success',
        message: 'Se ha desscargado el reporte'
      });
    }.bind(this);
    xlsx(resportDataExcel, this.settings, callback)
  }

  getStatusEmail(email){
    const status = ['Success','Warning', 'Error', 'Delete'];
    if(email && !email.isAnalyzed && !email.isPhishing && !email.isDeletedMessage){
      return status[1];
    } else if(email && email.isAnalyzed && !email.isPhishing && !email.isDeletedMessage){
      return status[0];
    } else if(email.isDeletedMessage){
      return status[3];
    } else {
      return status[2];
    }
  }

  getStatusEmailName(email){
    const status = ['Leible','Pendiente', 'Phishing', 'Eliminado'];
    if(email && !email.isAnalyzed && !email.isPhishing && !email.isDeletedMessage){
      return status[1];
    } else if(email && email.isAnalyzed && !email.isPhishing && !email.isDeletedMessage){
      return status[0];
    } else if(email.isDeletedMessage){
      return status[3];
    } else {
      return status[2];
    }
  }

  getRol(){
    const dataUser = this.authService.getSesionStorage('dataUser');
    if(dataUser !== null){
      let user = JSON.parse(dataUser);
      if(user && user.roleName && (user.roleName.toUpperCase() === 'ADMINISTRADOR' || user.roleName.toUpperCase() === 'SUPERVISOR')) {
        return true;
      }
      else{
        return false;
      };
    }
  }



}
