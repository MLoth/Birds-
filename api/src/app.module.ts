import { Module } from '@nestjs/common'

import { BirdsModule } from './birds/birds.module'
import { ObservationsModule } from './observations/observations.module'
import { LocationsModule } from './locations/locations.module'
import { BootstrapModule } from './bootstrap/bootstrap.module'
import { DatabaseSeedModule } from './seed/seed.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { LivelocationsModule } from './livelocations/livelocations.module'
import { NotificationsModule } from './notifications/notifications.module'

@Module({
  imports: [
    BootstrapModule,
    AuthModule,

    BirdsModule,
    ObservationsModule,
    LocationsModule,
    UsersModule,
    LivelocationsModule,
    NotificationsModule,

    DatabaseSeedModule,
  ],

  exports: [],

  providers: [],
})
export class AppModule {}
