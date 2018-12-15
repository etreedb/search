import { TestBed } from '@angular/core/testing';

import { PerformanceLinkService } from './performance-link.service';

describe('PerformanceLinkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PerformanceLinkService = TestBed.get(PerformanceLinkService);
    expect(service).toBeTruthy();
  });
});
