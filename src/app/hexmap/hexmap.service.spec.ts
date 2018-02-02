import { TestBed, inject } from '@angular/core/testing';

import { HexMapService } from './hexmap.service';

describe('HexMapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HexMapService]
    });
  });

  it('should be created', inject([HexMapService], (service: HexMapService) => {
    expect(service).toBeTruthy();
  }));
});
