import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResearchersRoutingModule } from './researchers-routing.module';
import { MainResearchersComponent } from './pages/main-researchers/main-researchers.component';
import { SharedModule } from '@app/shared/sharedModule';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [MainResearchersComponent],
  imports: [
    SharedModule,
    CommonModule,
    ResearchersRoutingModule
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE, useValue: 'en-GB'
    }
  ]
})
export class ResearchersModule { }
