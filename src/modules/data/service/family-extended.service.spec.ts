import { TestBed } from '@angular/core/testing';

import { FamilyExtendedService } from './family-extended.service';

describe('FamilyExtendedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FamilyExtendedService = TestBed.get(FamilyExtendedService);
    expect(service).toBeTruthy();
  });
});
