import { Field, InputType, ObjectType } from '@nestjs/graphql'
import {
  IsNotEmpty,
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  Equals,
} from 'class-validator'

@InputType('GeoPointInput')
@ObjectType()
export class GeoPoint {
  @IsNotEmpty()
  @ArrayMaxSize(2)
  @ArrayMinSize(2)
  @ArrayNotEmpty()
  @Field(() => [Number])
  coordinates: number[]

  @IsNotEmpty()
  @Equals('Point')
  @Field()
  type: string
}
