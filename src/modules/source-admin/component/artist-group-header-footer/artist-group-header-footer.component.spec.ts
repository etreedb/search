import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistGroupHeaderFooterComponent } from './artist-group-header-footer.component';

describe('ArtistGroupHeaderFooterComponent', () => {
  let component: ArtistGroupHeaderFooterComponent;
  let fixture: ComponentFixture<ArtistGroupHeaderFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistGroupHeaderFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistGroupHeaderFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
