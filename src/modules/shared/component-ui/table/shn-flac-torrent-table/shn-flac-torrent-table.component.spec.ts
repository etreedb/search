import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShnFlacTorrentTableComponent } from './shn-flac-torrent-table.component';

describe('ShnFlacTorrentTableComponent', () => {
  let component: ShnFlacTorrentTableComponent;
  let fixture: ComponentFixture<ShnFlacTorrentTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShnFlacTorrentTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShnFlacTorrentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
