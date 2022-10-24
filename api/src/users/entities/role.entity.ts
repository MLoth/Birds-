import { Field, InputType, ObjectType } from '@nestjs/graphql'

// Think whether you need this in typeorm or not (I don't think so)

@InputType('RoleInput')
@ObjectType()
export class Role {
  @Field()
  name: string

  @Field({ nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  updatedAt?: Date
}
