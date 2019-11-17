import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TorrentLayoutComponent } from './torrent-layout.component';

describe('TorrentLayoutComponent', () => {
  let component: TorrentLayoutComponent;
  let fixture: ComponentFixture<TorrentLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TorrentLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TorrentLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
