import { TestBed } from '@angular/core/testing';

import { PostEmService } from './post-em.service';

describe('PostEmService', () => {
  let service: PostEmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostEmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
