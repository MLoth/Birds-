import { ObjectType, Field, ID } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ObjectId } from 'mongodb'
import { Point } from 'geojson'

import { GeoPoint } from '../../locations/entities/geopoint.entity'
import { User } from '../../users/entities/user.entity'

@Entity()
@ObjectType()
export class Livelocation {
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectId

  @Column() //mongodb
  idUser: string

  @Field(() => User) //graphql
  user: User

  @Field((type) => GeoPoint)
  @Column({ nullable: true, type: 'simple-json' })
  geolocation: Point

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date
}
