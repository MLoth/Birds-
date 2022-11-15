import { Test, TestingModule } from '@nestjs/testing';
import { LivelocationsResolver } from './livelocations.resolver';
import { LivelocationsService } from './livelocations.service';

describe('LivelocationsResolver', () => {
  let resolver: LivelocationsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LivelocationsResolver, LivelocationsService],
    }).compile();

    resolver = module.get<LivelocationsResolver>(LivelocationsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
