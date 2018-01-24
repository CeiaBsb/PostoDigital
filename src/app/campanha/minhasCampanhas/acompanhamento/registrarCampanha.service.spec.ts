/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RegistrarCampanhaService } from './registrarCampanha.service';

describe('Service: RegistrarCampanha', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistrarCampanhaService]
    });
  });

  it('should ...', inject([RegistrarCampanhaService], (service: RegistrarCampanhaService) => {
    expect(service).toBeTruthy();
  }));
});