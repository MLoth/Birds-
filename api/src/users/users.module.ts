import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UsersService } from './users.service'
import { UsersResolver } from './users.resolver'
import { User } from './entities/user.entity'
import { Observation } from 'src/observations/entities/observation.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User, Observation])],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
