import { Test, TestingModule } from '@nestjs/testing';
import { MedicalObservationsController } from './medical_observations.controller';
import { MedicalObservationsService } from './medical_observations.service';

describe('MedicalObservationsController', () => {
  let controller: MedicalObservationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalObservationsController],
      providers: [MedicalObservationsService],
    }).compile();

    controller = module.get<MedicalObservationsController>(MedicalObservationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
