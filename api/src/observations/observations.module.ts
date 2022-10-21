import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Bird } from 'src/birds/entities/bird.entity'
import { User } from 'src/users/entities/user.entity'
import { Observation } from './entities/observation.entity'
import { Location } from 'src/locations/entities/location.entity'

import { ObservationsService } from './observations.service'
import { ObservationsResolver } from './observations.resolver'
import { NotificationsModule } from 'src/notifications/notifications.module'
import { BirdsModule } from 'src/birds/birds.module'
import { UsersModule } from 'src/users/users.module'
import { LocationsModule } from 'src/locations/locations.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Bird, Location, Observation, User]),
    BirdsModule,
    UsersModule,
    NotificationsModule,
    LocationsModule,
  ],
  providers: [ObservationsResolver, ObservationsService],
})
export class ObservationsModule {}
