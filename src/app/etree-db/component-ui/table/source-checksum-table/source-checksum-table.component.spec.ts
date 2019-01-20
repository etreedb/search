import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceChecksumTableComponent } from './source-checksum-table.component';

describe('SourceChecksumTableComponent', () => {
  let component: SourceChecksumTableComponent;
  let fixture: ComponentFixture<SourceChecksumTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceChecksumTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceChecksumTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
