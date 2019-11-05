import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistLinkCreateComponent } from './artist-link-create.component';

describe('ArtistLinkCreateComponent', () => {
  let component: ArtistLinkCreateComponent;
  let fixture: ComponentFixture<ArtistLinkCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistLinkCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistLinkCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
