import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: "ro-button-raised",
    templateUrl: './ro-button-raised.component.html',
    styleUrls: ['./ro-button-raised.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class RoButtonRaisedComponent implements OnInit {

    @Input() typeButton: 'basic' | 'raised' | 'flat' | 'stroked' = 'raised'  ;
    @Input() color: 'primary' |'accent'| 'warn'| 'disabled' = 'primary';
    @Input() disabled: false | true = false;
    @Input() ngStyle: string = '';
    @Input() class: '';

    constructor(){
        
    }

    ngOnInit(){

    }
}