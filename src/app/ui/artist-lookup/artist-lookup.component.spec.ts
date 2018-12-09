import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistLookupComponent } from './artist-lookup.component';

describe('ArtistLookupComponent', () => {
  let component: ArtistLookupComponent;
  let fixture: ComponentFixture<ArtistLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistLookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
