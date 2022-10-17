import { Field, InputType, ObjectType } from '@nestjs/graphql'

@InputType('GeoPointInput')
@ObjectType()
export class GeoPoint {
  @Field(() => [Number])
  coordinates: number[]

  @Field()
  type: string
}
