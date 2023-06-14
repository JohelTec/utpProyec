import { Component, Input ,OnInit, SkipSelf, ViewEncapsulation } from '@angular/core';
import {FormControl, FormGroupDirective,ControlContainer, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'ro-toggle',
  templateUrl: './ro-toggle.component.html',
  styleUrls: ['./ro-toggle.component.scss'],
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
export class RoToggleComponent implements OnInit {
    
    @Input() controlName:string;
    @Input() position:string = 'after';
    
    ngOnInit() {
    }

}
