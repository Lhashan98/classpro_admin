import { TestBed } from '@angular/core/testing';

import { AddcordinatorsService } from './addcordinators.service';

describe('AddcordinatorsService', () => {
  let service: AddcordinatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddcordinatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
