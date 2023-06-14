import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResearchersRoutingModule } from './researchers-routing.module';
import { MainResearchersComponent } from './pages/main-researchers/main-researchers.component';
import { SharedModule } from '@app/shared/sharedModule';


@NgModule({
  declarations: [MainResearchersComponent],
  imports: [
    SharedModule,
    CommonModule,
    ResearchersRoutingModule
  ]
})
export class ResearchersModule { }
