import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtreeCollectionComponent } from './etree-collection.component';

describe('EtreeCollectionComponent', () => {
  let component: EtreeCollectionComponent;
  let fixture: ComponentFixture<EtreeCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtreeCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtreeCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
