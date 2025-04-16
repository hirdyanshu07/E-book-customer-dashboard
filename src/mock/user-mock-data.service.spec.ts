import { TestBed } from '@angular/core/testing';

import { UserMockDataService } from './user-mock-data.service';

describe('UserMockDataService', () => {
  let service: UserMockDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserMockDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
