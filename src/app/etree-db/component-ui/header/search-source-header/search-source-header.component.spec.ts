import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSourceHeaderComponent } from './search-source-header.component';

describe('SearchSourceHeaderComponent', () => {
  let component: SearchSourceHeaderComponent;
  let fixture: ComponentFixture<SearchSourceHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchSourceHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSourceHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
