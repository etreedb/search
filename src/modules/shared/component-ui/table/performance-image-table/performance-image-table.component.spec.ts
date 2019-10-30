import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceImageTableComponent } from './performance-image-table.component';

describe('PerformanceImageTableComponent', () => {
  let component: PerformanceImageTableComponent;
  let fixture: ComponentFixture<PerformanceImageTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformanceImageTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceImageTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
