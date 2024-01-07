import { TestBed } from '@angular/core/testing';

import { HigwayService } from './higway.service';

describe('HigwayService', () => {
  let service: HigwayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HigwayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
