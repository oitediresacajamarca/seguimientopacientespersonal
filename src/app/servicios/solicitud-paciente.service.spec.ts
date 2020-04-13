import { TestBed } from '@angular/core/testing';

import { SolicitudPacienteService } from './solicitud-paciente.service';

describe('SolicitudPacienteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SolicitudPacienteService = TestBed.get(SolicitudPacienteService);
    expect(service).toBeTruthy();
  });
});
