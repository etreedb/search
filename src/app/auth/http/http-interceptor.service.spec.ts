import { TestBed } from '@angular/core/testing';

import { HttpListener } from './http-interceptor.service';

describe('HttpListener', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpListener = TestBed.get(HttpListener);
    expect(service).toBeTruthy();
  });
});
