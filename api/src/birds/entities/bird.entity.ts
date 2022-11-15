import { Field, ID, ObjectType } from '@nestjs/graphql'
import { ObjectId } from 'mongodb'
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
@ObjectType({ description: 'bird' })
export class Bird {
  @Field(() => ID) // GraphQL
  @ObjectIdColumn() //typeORM // Map this field to the (generated) _id column in the database
  id: ObjectId

  @Field() // GraphQL
  @Column() // typeORM
  name: string

  @Field()
  @Column()
  fullname: string

  @Field()
  @Column()
  category: string

  @Field()
  @Column()
  url: string

  @Field({ defaultValue: 0 })
  @Column()
  observations: number

  @Field({ nullable: true })
  @Column()
  description?: string

  @Field({ nullable: true })
  @Column()
  active?: boolean

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date
}
