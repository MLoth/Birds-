import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CommandModule } from 'nestjs-command'

import { Bird } from '../birds/entities/bird.entity'
import { DatabaseSeedService } from './seed.service'
import { DatabaseSeedCommand } from './seed.command'
import { Location } from 'src/locations/entities/location.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Bird, Location]), CommandModule],
  providers: [DatabaseSeedCommand, DatabaseSeedService],
})
export class DatabaseSeedModule {}
