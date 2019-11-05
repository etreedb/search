import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceLinkTableComponent } from './performance-link-table.component';

describe('PerformanceLinkTableComponent', () => {
  let component: PerformanceLinkTableComponent;
  let fixture: ComponentFixture<PerformanceLinkTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformanceLinkTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceLinkTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
