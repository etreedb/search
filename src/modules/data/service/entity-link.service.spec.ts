import { TestBed } from '@angular/core/testing';

import { EntityLinkService } from './entity-link.service';

describe('EntityLinkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EntityLinkService = TestBed.get(EntityLinkService);
    expect(service).toBeTruthy();
  });
});
