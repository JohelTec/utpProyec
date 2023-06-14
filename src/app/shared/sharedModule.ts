import { OverlayModule } from '@angular/cdk/overlay';
import { CdkTreeModule } from '@angular/cdk/tree';
import { PortalModule } from '@angular/cdk/portal';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';

const materialModules = [
  CdkTreeModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDividerModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatButtonToggleModule,
  MatTreeModule,
  OverlayModule,
  PortalModule,
  MatStepperModule,
  MatSlideToggleModule,
  MatSliderModule,
  MatDialogModule,
  MatRadioModule
];

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { RoButtonComponent } from '@components/ro-buttom/ro-button.component';
import { RoButtonRaisedComponent } from '@app/shared/components/ro-button-raised/ro-button-raised.component';
import { RoButtonStrokedComponent } from '@app/shared/components/ro-button-stroked/ro-button-stroked.component';
import { RoButtonFlatComponent } from './components/ro-button-flat/ro-button-flat.component';
import { RoSelectComponent } from '@components/ro-select/ro-select.component';
import { RoInputComponent } from '@components/ro-input/ro-input.component';
import { RoToggleComponent } from '@components/ro-toggle/ro-toggle.component';
import { RoTextareaComponent } from '@components/ro-textarea/ro-textarea.component';
import { RoLoaderComponent } from '@components/ro-loader/ro-loader.component';
import { RoCheckboxComponent } from '@components/ro-checkbox/ro-checkbox.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '@app/layout/footer/footer.component';




const sharedModule = [
    RoCheckboxComponent,
    RoButtonComponent,
    RoButtonRaisedComponent,
    RoButtonStrokedComponent,
    RoButtonFlatComponent,
    RoSelectComponent,
    RoInputComponent,
    RoToggleComponent,
    RoTextareaComponent,
    RoLoaderComponent,
    FooterComponent
];


import { modalErrorComponent } from '@modals/error/modal.error.component';

const modales = [
    modalErrorComponent
]


@NgModule({
    imports: [ 
        RouterModule,
        CommonModule,
        ...materialModules,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        ...sharedModule,
        ...modales
    ],
    exports: [ 
        ...sharedModule,
        ...materialModules,
        FormsModule,
        ReactiveFormsModule,
    ],
    entryComponents: [
        ...modales
    ]
})
export class SharedModule { }