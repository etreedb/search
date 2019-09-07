import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceAdminLayoutComponent } from './source-admin-layout.component';

describe('SourceAdminLayoutComponent', () => {
  let component: SourceAdminLayoutComponent;
  let fixture: ComponentFixture<SourceAdminLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceAdminLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceAdminLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
