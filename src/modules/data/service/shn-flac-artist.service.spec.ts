import { TestBed } from '@angular/core/testing';

import { ShnFlacArtistService } from './shn-flac-artist.service';

describe('ShnFlacArtistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShnFlacArtistService = TestBed.get(ShnFlacArtistService);
    expect(service).toBeTruthy();
  });
});
