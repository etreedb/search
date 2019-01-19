import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtreeCollectionHeaderComponent } from './etree-collection-header.component';

describe('EtreeCollectionHeaderComponent', () => {
  let component: EtreeCollectionHeaderComponent;
  let fixture: ComponentFixture<EtreeCollectionHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtreeCollectionHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtreeCollectionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
