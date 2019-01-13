import { TestBed } from '@angular/core/testing';

import { IaIdentifierService } from './ia-identifier.service';

describe('IaIdentifierService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IaIdentifierService = TestBed.get(IaIdentifierService);
    expect(service).toBeTruthy();
  });
});
