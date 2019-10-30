import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceImageCreateComponent } from './performance-image-create.component';

describe('PerformanceImageCreateComponent', () => {
  let component: PerformanceImageCreateComponent;
  let fixture: ComponentFixture<PerformanceImageCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformanceImageCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceImageCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
