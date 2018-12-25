import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaToolsComponent } from './textarea-tools.component';

describe('TextareaToolsComponent', () => {
  let component: TextareaToolsComponent;
  let fixture: ComponentFixture<TextareaToolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextareaToolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
