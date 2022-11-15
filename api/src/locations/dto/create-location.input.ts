import { InputType, Field } from '@nestjs/graphql'
import { Polygon } from 'geojson'
import {
  IsNotEmpty,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator'
import { Type } from 'class-transformer'
import { Area } from '../entities/area.entity'

@InputType()
export class CreateLocationInput {
  @IsString() //validation
  @IsNotEmpty() //validation
  @MinLength(5)
  @Field()
  name: string

  @IsNotEmpty() //validation
  @ValidateNested() //validation
  @Type((type) => Area) //class-transfomer
  @Field(() => Area)
  area: Polygon
}
