import { TestBed } from '@angular/core/testing';

import { AddreportService } from './addreport.service';

describe('AddreportService', () => {
  let service: AddreportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddreportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
