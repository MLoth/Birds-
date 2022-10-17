import { Field, InputType, ObjectType } from '@nestjs/graphql'

@InputType('AreaInput')
@ObjectType()
export class Area {
  @Field(() => [[[Number]]])
  coordinates: number[][][]

  @Field()
  type: string
}
