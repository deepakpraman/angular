import { TestBed } from '@angular/core/testing';

import { NudgeService } from './nudge.service';

describe('NudgeService', () => {
  let service: NudgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NudgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
