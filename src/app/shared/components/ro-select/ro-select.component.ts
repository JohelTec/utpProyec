import { Component, Input ,OnInit, SkipSelf, ViewEncapsulation } from '@angular/core';
import {FormControl, FormGroupDirective,ControlContainer, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'ro-select',
  templateUrl: './ro-select.component.html',
  styleUrls: ['./ro-select.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: (controlContainer: ControlContainer) =>
          controlContainer,
      deps: [[new SkipSelf(), ControlContainer]],
    }
  ],
  encapsulation: ViewEncapsulation.None
})
export class RoSelectComponent implements OnInit {

  @Input() public controlName:string;
  @Input() public placeholder:string = "";
  @Input() public value:string;
  @Input() public appearance:string;
  @Input() public floatLabel:string;
  @Input() label: string = null;
  @Input() title: string = null;
  @Input() multiple: boolean = false;
  @Input() data:Array<Object>;
  @Input() disabled: boolean;
  
  
  
  selectedValue: string;
  selectedCar: string;
  // selected: any = "option1";

  // foods  = [
  //   {key: 'steak0', value: 'Casas de playa /Campo'},
  //   {key: 'pizza1', value: 'Departamento completo'},
  //   {key: 'tacos2', value: 'Habitación independiente'},
  //   {key: 'tacos3', value: 'Minidepartamento'},
  // ];

  ngOnInit() {
  }

}
