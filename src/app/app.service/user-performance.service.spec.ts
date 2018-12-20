import { TestBed } from '@angular/core/testing';

import { UserPerformanceService } from './user-performance.service';

describe('UserPerformanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserPerformanceService = TestBed.get(UserPerformanceService);
    expect(service).toBeTruthy();
  });
});
