import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceLinkCreateComponent } from './source-link-create.component';

describe('SourceLinkCreateComponent', () => {
  let component: SourceLinkCreateComponent;
  let fixture: ComponentFixture<SourceLinkCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceLinkCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceLinkCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
