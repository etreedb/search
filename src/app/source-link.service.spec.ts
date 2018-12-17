import { TestBed } from '@angular/core/testing';

import { SourceLinkService } from './source-link.service';

describe('SourceLinkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SourceLinkService = TestBed.get(SourceLinkService);
    expect(service).toBeTruthy();
  });
});
