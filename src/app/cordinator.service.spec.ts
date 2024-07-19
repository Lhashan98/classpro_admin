import { TestBed } from '@angular/core/testing';

import { CordinatorService } from './cordinator.service';

describe('CordinatorService', () => {
  let service: CordinatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CordinatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
