import { Module } from '@nestjs/common'
import { LocationsService } from './locations.service'
import { LocationsResolver } from './locations.resolver'
import { Location } from './entities/location.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Observation } from 'src/observations/entities/observation.entity'
import { Bird } from 'src/birds/entities/bird.entity'
import { User } from 'src/users/entities/user.entity'

import { BirdsModule } from 'src/birds/birds.module'
import { UsersModule } from 'src/users/users.module'
import { ObservationsService } from 'src/observations/observations.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Location, Observation, Bird, User]),
    BirdsModule,
    UsersModule,
  ],
  providers: [LocationsResolver, LocationsService, ObservationsService],
  exports: [LocationsService],
})
export class LocationsModule {}
