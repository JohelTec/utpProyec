import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/shared/services/auth.service';
import xlsx from "json-as-xlsx";
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-main-researchers',
  templateUrl: './main-researchers.component.html',
  styleUrls: ['./main-researchers.component.scss'],
})
export class MainResearchersComponent implements OnInit {
  formfilter: FormGroup;
  dataReport: [] = [];
  data = [
    {
      sheet: "Adults",
      columns: [
        { label: "User", value: "user" }, // Top level data
        { label: "Age", value: (row) => row.age + " years" }, // Custom format
        { label: "Phone", value: (row) => (row.more ? row.more.phone || "" : "") }, // Run functions
      ],
      content: [
        { user: "Andrea", age: 20, more: { phone: "11111111" } },
        { user: "Luis", age: 21, more: { phone: "12345678" } },
      ],
    },
    {
      sheet: "Children",
      columns: [
        { label: "User", value: "user" }, // Top level data
        { label: "Age", value: "age", format: '# "years"' }, // Column format
        { label: "Phone", value: "more.phone", format: "(###) ###-####" }, // Deep props and column format
      ],
      content: [
        { user: "Manuel", age: 16, more: { phone: 9999999900 } },
        { user: "Ana", age: 17, more: { phone: 8765432135 } },
      ],
    },
  ];

  settings = {
    fileName: "MySpreadsheet", // Name of the resulting spreadsheet
    extraLength: 3, // A bigger number means that columns will be wider
    writeMode: "writeFile", // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
    writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
    RTL: false, // Display the columns from right-to-left (the default value is false)
  }
  constructor(
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
    
    this.formfilter = new FormGroup({
      from: new FormControl(new Date(2023, 5, 1), Validators.required),
      to: new FormControl(new Date(2023, 5, 30), Validators.required),
    })
    this.init()
    
  }

  init() {
    this.getReports();
  }

  onFormSubmit() {
    console.log("this.formfilter", this.formfilter.value);
    console.log("this.formfilter", this.formfilter.valid);
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
      console.log("getReports", resp)
      this.dataReport = resp;
    })
  }

  exportExcel(){
    xlsx(this.data, this.settings)
  }

}
