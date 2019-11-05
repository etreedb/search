import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceLinkTableComponent } from './source-link-table.component';

describe('SourceLinkTableComponent', () => {
  let component: SourceLinkTableComponent;
  let fixture: ComponentFixture<SourceLinkTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceLinkTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceLinkTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
