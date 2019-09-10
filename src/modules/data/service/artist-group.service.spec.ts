import { TestBed } from '@angular/core/testing';

import { ArtistGroupService } from './artist-group.service';

describe('ArtistGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArtistGroupService = TestBed.get(ArtistGroupService);
    expect(service).toBeTruthy();
  });
});
