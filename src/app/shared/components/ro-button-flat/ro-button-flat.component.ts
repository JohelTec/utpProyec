import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: "ro-button-flat",
    templateUrl: './ro-button-flat.component.html',
    styleUrls: ['./ro-button-flat.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class RoButtonFlatComponent implements OnInit {

    @Input() typeButton: 'basic' | 'raised' | 'flat' | 'stroked' = 'raised'  ;
    @Input() color: 'primary' |'accent'| 'warn' = 'primary';
    @Input() class: '';
    @Input() disabled: false | true = false;
    @Input() ngStyle: string = '';
    @Input() type= "button"

    constructor(){
        
    }

    ngOnInit(){

    }
}