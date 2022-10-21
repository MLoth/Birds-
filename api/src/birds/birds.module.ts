import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { BirdsService } from './birds.service'
import { BirdsResolver } from './birds.resolver'
import { Bird } from './entities/bird.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Bird])],
  providers: [BirdsResolver, BirdsService],
  exports: [BirdsService],
})
export class BirdsModule {}
