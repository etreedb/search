import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginTakeComponent } from './login-take.component';

describe('LoginTakeComponent', () => {
  let component: LoginTakeComponent;
  let fixture: ComponentFixture<LoginTakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginTakeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginTakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
