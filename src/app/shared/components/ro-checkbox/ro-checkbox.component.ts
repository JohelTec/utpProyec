import { Component, Input ,OnInit, ViewEncapsulation, SkipSelf } from '@angular/core';
import {FormControl, FormGroupDirective,ControlContainer, NgForm, Validators} from '@angular/forms';

@Component({
    selector: 'ro-checkbox',
    templateUrl: './ro-checkbox.component.html',
    styleUrls: ['./ro-checkbox.component.scss'],
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
export class RoCheckboxComponent implements OnInit {
    task = {
        name: 'Indeterminate',
        completed: false,
        color: 'primary',
        subtasks: [
          {name: 'Primary', completed: false, color: 'primary'},
          {name: 'Accent', completed: false, color: 'accent'},
          {name: 'Warn', completed: false, color: 'warn'},
        ],
      };
    
    @Input() controlName:string;
    @Input() allComplete:boolean = false;

    ngOnInit() {
    }

    someComplete(): boolean {
        if (this.task.subtasks == null) {
            return false;
        }
        return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
    }

    updateAllComplete() {
        this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
    }

    setAll(completed: boolean) {
        this.allComplete = completed;
        if (this.task.subtasks == null) {
            return;
        }
        this.task.subtasks.forEach(t => (t.completed = completed));
        }

}
