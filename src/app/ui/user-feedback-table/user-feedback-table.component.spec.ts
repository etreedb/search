import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFeedbackTableComponent } from './user-feedback-table.component';

describe('UserFeedbackTableComponent', () => {
  let component: UserFeedbackTableComponent;
  let fixture: ComponentFixture<UserFeedbackTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFeedbackTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFeedbackTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
