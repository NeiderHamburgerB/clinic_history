import { Test, TestingModule } from '@nestjs/testing';
import { MedicalObservationsService } from './medical_observations.service';

describe('MedicalObservationsService', () => {
  let service: MedicalObservationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicalObservationsService],
    }).compile();

    service = module.get<MedicalObservationsService>(MedicalObservationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
