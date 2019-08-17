import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPerformanceHeaderComponent } from './search-performance-header.component';

describe('SearchPerformanceHeaderComponent', () => {
  let component: SearchPerformanceHeaderComponent;
  let fixture: ComponentFixture<SearchPerformanceHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPerformanceHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPerformanceHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
