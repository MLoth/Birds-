import { Field, InputType, ObjectType } from '@nestjs/graphql'

@InputType('RoleInput')
@ObjectType()
export class Role {
  @Field(() => String)
  name: string

  @Field({ nullable: true })
  updatedAt?: Date

  @Field({ nullable: true })
  createdAt?: Date
}
