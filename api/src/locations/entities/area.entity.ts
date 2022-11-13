import { Field, InputType, ObjectType } from '@nestjs/graphql'
import {
  IsNotEmpty,
  ValidateNested,
  Equals,
  IsArray,
  ArrayMinSize,
  ArrayNotEmpty,
} from 'class-validator'

@InputType('AreaInput')
@ObjectType()
export class Area {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayNotEmpty()
  @Field(() => [[[Number]]])
  coordinates: number[][][]

  @IsNotEmpty()
  @Equals('Polygon')
  @Field()
  type: string
}
