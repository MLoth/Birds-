import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateBirdInput {
  @Field()
  name: string

  @Field()
  fullname: string

  @Field()
  category: string

  @Field()
  url: string

  @Field({ defaultValue: 0 })
  observations: number

  @Field({ nullable: true })
  description?: string
}
