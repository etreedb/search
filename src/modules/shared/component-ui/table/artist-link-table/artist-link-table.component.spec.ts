import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtistLinkTableComponent } from './artist-link-table.component';

describe('ArtistLinkComponent', () => {
  let component: ArtistLinkComponent;
  let fixture: ComponentFixture<ArtistLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
