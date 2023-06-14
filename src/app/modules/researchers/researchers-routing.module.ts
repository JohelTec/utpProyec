import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainResearchersComponent } from './pages/main-researchers/main-researchers.component';

const routes: Routes = [
  {
    path: '',
    component: MainResearchersComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResearchersRoutingModule { }
