import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MainComponent } from './pages/main/main.component';
import { DetailUserComponent } from './pages/detail-user/detail-user.component';
import { SharedModule } from '@app/shared/sharedModule';
import { ReportClientBussinesComponent } from './pages/report-client-bussines/report-client-bussines.component';


@NgModule({
  declarations: [MainComponent, DetailUserComponent, ReportClientBussinesComponent],
  imports: [
    SharedModule,
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
