import { TestBed, inject } from '@angular/core/testing';

import { CampanhaService } from './campanha.service';

describe('CampanhaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CampanhaService]
    });
  });

  it('should be created', inject([CampanhaService], (service: CampanhaService) => {
    expect(service).toBeTruthy();
  }));
});
