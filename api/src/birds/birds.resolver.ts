import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'

import { Bird } from './entities/bird.entity'
import { BirdsService } from './birds.service'
import { CreateBirdInput } from './dto/create-bird.input'
import { UpdateBirdInput } from './dto/update-bird.input'
import {
  ClientMessage,
  MessageTypes,
} from '../bootstrap/entities/ClientMessage'

@Resolver(() => Bird)
export class BirdsResolver {
  constructor(private readonly birdsService: BirdsService) {}

  @Mutation(() => Bird, { description: 'Create a bird using the DTO.' })
  createBird(
    @Args('createBirdInput') createBirdInput: CreateBirdInput,
  ): Promise<Bird> {
    return this.birdsService.create(createBirdInput)
  }

  @Query(() => [Bird], { name: 'birds' })
  findAll(): Promise<Bird[]> {
    return this.birdsService.findAll()
  }

  @Query(() => Bird, { name: 'bird' })
  findOne(@Args('id', { type: () => String }) id: string): Promise<Bird> {
    return this.birdsService.findOne(id)
  }

  @Mutation(() => Bird)
  updateBird(
    @Args('updateBirdInput') updateBirdInput: UpdateBirdInput,
  ): Promise<Bird> {
    return this.birdsService.update(updateBirdInput)
  }

  // TODO: birdsByLocation

  // TODO: birdsByCategory

  @Mutation(() => ClientMessage)
  async removeBird(
    @Args('id', { type: () => String }) id: string,
  ): Promise<ClientMessage> {
    const deleted = await this.birdsService.remove(id)
    if (deleted.affected <= 1)
      return {
        type: MessageTypes.success,
        message: 'Bird deleted',
        statusCode: 200,
      }

    return {
      type: MessageTypes.error,
      message: 'Delete action went very wrong.',
      statusCode: 400,
    }
  }
}
