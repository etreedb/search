import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceLinkCreateComponent } from './performance-link-create.component';

describe('PerformanceLinkCreateComponent', () => {
  let component: PerformanceLinkCreateComponent;
  let fixture: ComponentFixture<PerformanceLinkCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformanceLinkCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceLinkCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
