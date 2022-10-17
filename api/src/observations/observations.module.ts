import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Observation } from './entities/observation.entity'
import { Bird } from 'src/birds/entities/bird.entity'
import { User } from 'src/users/entities/user.entity'
import { Location } from 'src/locations/entities/location.entity'
import { ObservationsService } from './observations.service'
import { ObservationsResolver } from './observations.resolver'
import { LocationsService } from 'src/locations/locations.service'
import { BirdsService } from 'src/birds/birds.service'
import { UsersService } from 'src/users/users.service'

@Module({
  imports: [TypeOrmModule.forFeature([Bird, Location, Observation, User])],
  providers: [
    UsersService,
    BirdsService,
    LocationsService,
    ObservationsResolver,
    ObservationsService,
  ],
})
export class ObservationsModule {}
