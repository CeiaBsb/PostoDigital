/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FrequenciaService } from './frequencia.service';

describe('Service: Frequencia', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FrequenciaService]
    });
  });

  it('should ...', inject([FrequenciaService], (service: FrequenciaService) => {
    expect(service).toBeTruthy();
  }));
});