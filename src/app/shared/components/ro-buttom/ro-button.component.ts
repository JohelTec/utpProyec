import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: "ro-button",
    templateUrl: './ro-button.component.html',
    styleUrls: ['./ro-button.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class RoButtonComponent implements OnInit {

    @Input() typeButton: 'basic' | 'raised' | 'flat' | 'stroked' = 'raised'  ;
    @Input() color: 'primary' |'accent'| 'warn' = 'primary';
    @Input() disabled: false | true = false;
    @Input() ngStyle: string = '';

    constructor(){
        
    }

    ngOnInit(){

    }
}