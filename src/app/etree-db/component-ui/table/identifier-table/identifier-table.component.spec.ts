import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IaIdentifierTableComponent } from './ia-identifier-table.component';

describe('IaIdentifierTableComponent', () => {
  let component: IaIdentifierTableComponent;
  let fixture: ComponentFixture<IaIdentifierTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IaIdentifierTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IaIdentifierTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
