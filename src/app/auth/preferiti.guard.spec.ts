import { TestBed } from '@angular/core/testing';

import { PreferitiGuard } from './preferiti.guard';

describe('PreferitiGuard', () => {
  let guard: PreferitiGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PreferitiGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
