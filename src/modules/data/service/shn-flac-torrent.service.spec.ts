import { TestBed } from '@angular/core/testing';

import { ShnFlacTorrentService } from './shn-flac-torrent.service';

describe('ShnFlacTorrentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShnFlacTorrentService = TestBed.get(ShnFlacTorrentService);
    expect(service).toBeTruthy();
  });
});
