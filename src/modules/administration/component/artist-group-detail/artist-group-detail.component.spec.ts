import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistGroupDetailComponent } from './artist-group-detail.component';

describe('ArtistGroupDetailComponent', () => {
  let component: ArtistGroupDetailComponent;
  let fixture: ComponentFixture<ArtistGroupDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistGroupDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistGroupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
