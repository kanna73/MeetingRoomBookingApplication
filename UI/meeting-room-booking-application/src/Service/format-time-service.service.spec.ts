import { TestBed } from '@angular/core/testing';

import { FormatTimeServiceService } from './format-time-service.service';

describe('FormatTimeServiceService', () => {
  let service: FormatTimeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormatTimeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
