import {Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  templateUrl: './modal.error.component.html',
  styleUrls: ['./modal.error.component.scss'],
})
export class modalErrorComponent implements OnInit {
    listTextIcon = [
      {
        key: 'error',
        title: 'Error',
        color: 'ro-font-red',
        bg: 'ro-bg-red',
        name: 'error'
      },
      {
        key: 'info',
        title: 'Info',
        color: 'ro-font-yellow',
        bg: 'ro-bg-yellow',
        name: 'info'
      },
      {
        key: 'check_circle',
        title: 'Exitoso',
        color: 'ro-font-green',
        bg: 'ro-bg-green',
        name: 'success'
      }
    ]

    textIcon:any;
    @Output() eventOnNoClick: EventEmitter<any> = new EventEmitter<any>();

    constructor(
      public dialogRef: MatDialogRef<modalErrorComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
    ) {};
    
    ngOnInit() {
      const textIcon : any = this.listTextIcon.find(item => item.name === this.data.type);
      this.textIcon = textIcon;
    }

    onNoClick(): void {
      this.dialogRef.close();
      this.eventOnNoClick.emit();
    }

}
