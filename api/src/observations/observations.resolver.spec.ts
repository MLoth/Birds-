import { Test, TestingModule } from '@nestjs/testing'
import { ObservationsResolver } from './observations.resolver'
import { ObservationsService } from './observations.service'

describe('ObservationsResolver', () => {
  let resolver: ObservationsResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ObservationsResolver, ObservationsService],
    }).compile()

    resolver = module.get<ObservationsResolver>(ObservationsResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
