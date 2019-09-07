import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtreeCollectionLayoutComponent } from './etree-collection-layout.component';

describe('EtreeCollectionLayoutComponent', () => {
  let component: EtreeCollectionLayoutComponent;
  let fixture: ComponentFixture<EtreeCollectionLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtreeCollectionLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtreeCollectionLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
