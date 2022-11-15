import { Module } from '@nestjs/common'
import { LocationsService } from './locations.service'
import { LocationsResolver } from './locations.resolver'
import { Location } from './entities/location.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ObservationsService } from 'src/observations/observations.service'
import { Observation } from 'src/observations/entities/observation.entity'
import { BirdsService } from 'src/birds/birds.service'
import { Bird } from 'src/birds/entities/bird.entity'
import { UsersService } from 'src/users/users.service'
import { User } from 'src/users/entities/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Location, Observation, Bird, User])],
  providers: [
    BirdsService,
    ObservationsService,
    UsersService,
    LocationsResolver,
    LocationsService,
  ],
})
export class LocationsModule {}
