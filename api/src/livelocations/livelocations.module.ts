import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LivelocationsService } from './livelocations.service'
import { LivelocationsResolver } from './livelocations.resolver'
import { Livelocation } from './entities/livelocation.entity'
import { User } from '../users/entities/user.entity'
import { UsersService } from '../users/users.service'

@Module({
  imports: [TypeOrmModule.forFeature([Livelocation, User])],
  providers: [LivelocationsResolver, LivelocationsService, UsersService],
})
export class LivelocationsModule {}
