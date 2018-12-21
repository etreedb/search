import { TestBed } from '@angular/core/testing';

import { SourceChecksumService } from './source-checksum.service';

describe('SourceChecksumService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SourceChecksumService = TestBed.get(SourceChecksumService);
    expect(service).toBeTruthy();
  });
});
