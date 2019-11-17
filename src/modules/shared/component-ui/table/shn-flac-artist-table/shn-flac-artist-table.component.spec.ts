import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShnFlacArtistTableComponent } from './shn-flac-artist-table.component';

describe('ShnFlacArtistTableComponent', () => {
  let component: ShnFlacArtistTableComponent;
  let fixture: ComponentFixture<ShnFlacArtistTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShnFlacArtistTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShnFlacArtistTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
