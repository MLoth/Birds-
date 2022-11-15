import { CreateObservationInput } from './create-observation.input'
import { InputType, Field, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateObservationInput extends PartialType(
  CreateObservationInput,
) {
  @Field()
  id: string
}
