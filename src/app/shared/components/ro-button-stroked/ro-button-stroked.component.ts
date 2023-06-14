import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: "ro-button-stroked",
    templateUrl: './ro-button-stroked.component.html',
    styleUrls: ['./ro-button-stroked.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class RoButtonStrokedComponent implements OnInit {

    @Input() typeButton: 'basic' | 'raised' | 'flat' | 'stroked' = 'raised'  ;
    @Input() color: 'primary' |'accent'| 'warn' = 'primary';
    @Input() disabled: false | true = false;
    @Input() ngStyle: string = '';
    @Input() class: '';
    @Input() type= "button"
    
    
    constructor(){
        
    }

    ngOnInit(){

    }
}