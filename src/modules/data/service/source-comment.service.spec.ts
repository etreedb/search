import { TestBed } from '@angular/core/testing';

import { SourceCommentService } from './source-comment.service';

describe('SourceCommentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SourceCommentService = TestBed.get(SourceCommentService);
    expect(service).toBeTruthy();
  });
});
