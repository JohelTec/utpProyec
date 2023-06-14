import { Component, Input, OnInit, SkipSelf, ViewEncapsulation } from '@angular/core';
import { Validators, FormControl, FormGroup , Validator, FormGroupDirective, ControlContainer } from '@angular/forms';
@Component({
    selector: "ro-input",
    templateUrl: './ro-input.component.html',
    styleUrls: ['./ro-input.component.scss'],
    viewProviders: [
        {
          provide: ControlContainer,
            useFactory: (controlContainer: ControlContainer) =>
                controlContainer,
            deps: [[new SkipSelf(), ControlContainer]],
        }
      ],
    encapsulation: ViewEncapsulation.None,
    
})

export class RoInputComponent implements OnInit {

    @Input() public controlName:string;
    @Input() public placeholder:string = "";
    @Input() public value:string;
    @Input() public appearance:string;
    @Input() public floatLabel:string;
    @Input() public maxlength:string;
    @Input() public minlength:string;
    @Input() label: string = null;
    @Input() type: string = "text";
    
    
    constructor(){
        
    }

    ngOnInit(){

    }
}