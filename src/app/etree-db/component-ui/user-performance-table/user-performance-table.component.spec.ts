import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPerformanceTableComponent } from './user-performance-table.component';

describe('UserPerformanceTableComponent', () => {
  let component: UserPerformanceTableComponent;
  let fixture: ComponentFixture<UserPerformanceTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPerformanceTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPerformanceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
