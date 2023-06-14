import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EndUserRoutingModule } from './end-user-routing.module';
import { MainComponent } from './pages/main/main.component';
import { SharedModule } from '@app/shared/sharedModule';


@NgModule({
  declarations: [MainComponent],
  imports: [
    SharedModule,
    CommonModule,
    EndUserRoutingModule
  ]
})
export class EndUserModule { }
