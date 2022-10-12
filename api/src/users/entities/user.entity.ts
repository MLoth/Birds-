import { ObjectType, Field, Int, ID } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ObjectId } from 'mongodb'

import { Observation } from 'src/observations/entities/observation.entity'

@Entity()
@ObjectType()
export class User {
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectId

  @Field()
  @Column()
  uid: string

  @Field(() => [Observation], { nullable: 'itemsAndList' }) // Can return []
  @Column({ nullable: true })
  observations?: Observation[]

  @Field(() => Int)
  @Column()
  observationsCount?: number

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date
}
