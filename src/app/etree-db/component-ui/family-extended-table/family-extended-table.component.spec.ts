import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyExtendedTableComponent } from './family-extended-table.component';

describe('FamilyExtendedTableComponent', () => {
  let component: FamilyExtendedTableComponent;
  let fixture: ComponentFixture<FamilyExtendedTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyExtendedTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyExtendedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
