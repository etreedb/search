import { TestBed } from '@angular/core/testing';

import { IdentifierService } from './identifier.service';

describe('IdentifierService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IdentifierService = TestBed.get(IdentifierService);
    expect(service).toBeTruthy();
  });
});
