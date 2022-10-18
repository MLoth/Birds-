import { Test, TestingModule } from '@nestjs/testing';
import { LivelocationsService } from './livelocations.service';

describe('LivelocationsService', () => {
  let service: LivelocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LivelocationsService],
    }).compile();

    service = module.get<LivelocationsService>(LivelocationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
