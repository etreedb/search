import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceSearch2Component } from './performance-search2.component';

describe('PerformanceSearch2Component', () => {
  let component: PerformanceSearch2Component;
  let fixture: ComponentFixture<PerformanceSearch2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformanceSearch2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceSearch2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
