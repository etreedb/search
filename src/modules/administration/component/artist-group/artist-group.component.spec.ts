import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistGroupComponent } from './artist-group.component';

describe('ArtistGroupComponent', () => {
  let component: ArtistGroupComponent;
  let fixture: ComponentFixture<ArtistGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
