import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { DetailUserComponent } from './pages/detail-user/detail-user.component';
import { ReportClientBussinesComponent } from './pages/report-client-bussines/report-client-bussines.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'adduser',
    component: DetailUserComponent,
    data: { view: 'add'}
  },
  {
    path: 'detailuser',
    component: DetailUserComponent,
    data: { view: 'detail'}
  },
  {
    path: 'edituser',
    component: DetailUserComponent,
    data: { view: 'edit'}
  },
  {
    path: 'reporteClienteBussiness',
    component: ReportClientBussinesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
