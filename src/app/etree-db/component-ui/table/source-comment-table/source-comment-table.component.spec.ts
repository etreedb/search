import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceCommentTableComponent } from './source-comment-table.component';

describe('SourceCommentTableComponent', () => {
  let component: SourceCommentTableComponent;
  let fixture: ComponentFixture<SourceCommentTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceCommentTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceCommentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
