import { TestBed } from '@angular/core/testing';

import { CrudespeciesService } from './crudespecies.service';

describe('CrudespeciesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrudespeciesService = TestBed.get(CrudespeciesService);
    expect(service).toBeTruthy();
  });
});
