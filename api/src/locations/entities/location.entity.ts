import { ObjectType, Field, ID } from '@nestjs/graphql'
import { ObjectId } from 'mongodb'
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Polygon } from 'geojson'

import { Observation } from 'src/observations/entities/observation.entity'
import { Area } from './area.entity'

@Entity()
@ObjectType({ description: 'location' })
export class Location {
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectId

  @Field()
  @Column()
  name: string

  @Field(() => [Observation], { nullable: 'itemsAndList' })
  @Column({ nullable: true })
  observations: Observation[]

  @Field(() => Area)
  @Column({ nullable: true, type: 'simple-json' })
  area: Polygon

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date
}
