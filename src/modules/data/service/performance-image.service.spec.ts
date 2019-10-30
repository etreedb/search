import { TestBed } from '@angular/core/testing';

import { PerformanceImageService } from './performance-image.service';

describe('PerformanceImageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PerformanceImageService = TestBed.get(PerformanceImageService);
    expect(service).toBeTruthy();
  });
});
