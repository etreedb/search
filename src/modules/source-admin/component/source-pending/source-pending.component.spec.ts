import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourcePendingComponent } from './source-pending.component';

describe('SourcePendingComponent', () => {
  let component: SourcePendingComponent;
  let fixture: ComponentFixture<SourcePendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourcePendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourcePendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
