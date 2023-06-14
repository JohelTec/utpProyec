import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainResearchersComponent } from './main-researchers.component';

describe('MainResearchersComponent', () => {
  let component: MainResearchersComponent;
  let fixture: ComponentFixture<MainResearchersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainResearchersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainResearchersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
