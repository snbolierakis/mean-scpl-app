import { TestBed, inject } from '@angular/core/testing';

import { UserlogService } from './userlog.service';

describe('UserlogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserlogService]
    });
  });

  it('should ...', inject([UserlogService], (service: UserlogService) => {
    expect(service).toBeTruthy();
  }));
});
