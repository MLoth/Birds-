import { CreateBirdInput } from './create-bird.input'
import { InputType, Field, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateBirdInput extends PartialType(CreateBirdInput) {
  @Field()
  id!: string
}
