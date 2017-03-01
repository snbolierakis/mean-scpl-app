/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DealsService } from './deals.service';

describe('DealsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DealsService]
    });
  });

  it('should ...', inject([DealsService], (service: DealsService) => {
    expect(service).toBeTruthy();
  }));
});
