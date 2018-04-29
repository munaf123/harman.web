import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitormanagementComponent } from './visitormanagement.component';

describe('VisitormanagementComponent', () => {
  let component: VisitormanagementComponent;
  let fixture: ComponentFixture<VisitormanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitormanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitormanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
