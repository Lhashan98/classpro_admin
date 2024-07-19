import { TestBed } from '@angular/core/testing';

import { AddnewclassService } from './addnewclass.service';

describe('AddnewclassService', () => {
  let service: AddnewclassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddnewclassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
