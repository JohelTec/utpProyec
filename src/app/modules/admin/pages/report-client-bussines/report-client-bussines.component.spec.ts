import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportClientBussinesComponent } from './report-client-bussines.component';

describe('ReportClientBussinesComponent', () => {
  let component: ReportClientBussinesComponent;
  let fixture: ComponentFixture<ReportClientBussinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportClientBussinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportClientBussinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
