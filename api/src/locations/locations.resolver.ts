import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { LocationsService } from './locations.service'
import { Location } from './entities/location.entity'
import { CreateLocationInput } from './dto/create-location.input'
import { UpdateLocationInput } from './dto/update-location.input'
import { ObservationsService } from 'src/observations/observations.service'
import { Observation } from '../observations/entities/observation.entity'
import {
  ClientMessage,
  MessageTypes,
} from 'src/bootstrap/entities/ClientMessage'
import { Point } from 'geojson'
import { GeoPoint } from './entities/geopoint.entity'

@Resolver(() => Location)
export class LocationsResolver {
  constructor(
    private readonly locationsService: LocationsService,
    private readonly observationsService: ObservationsService,
  ) {}

  // @ResolveField()
  // observations(@Parent() l: Location): Promise<Observation> {
  //   return this.observationsService.findOne(l.observationsId)
  // }

  @Mutation(() => Location)
  createLocation(
    @Args('createLocationInput') createLocationInput: CreateLocationInput,
  ): Promise<Location> {
    return this.locationsService.create(createLocationInput)
  }

  @Query(() => [Location], { name: 'locations' })
  findAll(): Promise<Location[]> {
    return this.locationsService.findAll()
  }

  @Query(() => Location, { name: 'location' })
  findOne(@Args('id', { type: () => String }) id: string): Promise<Location> {
    return this.locationsService.findOne(id)
  }

  @Query(() => [Location], { name: 'findAreaByPoint' })
  findAreaByPoint(
    @Args('point', { type: () => GeoPoint }) p: Point,
  ): Promise<Location[]> {
    return this.locationsService.findLocationByPoint(p)
  }

  @Mutation(() => Location)
  updateLocation(
    @Args('updateLocationInput') updateLocationInput: UpdateLocationInput,
  ): Promise<Location> {
    return this.locationsService.update(updateLocationInput)
  }

  @Mutation(() => Location)
  async removeLocation(
    @Args('id', { type: () => String }) id: string,
  ): Promise<ClientMessage> {
    const deleted = await this.locationsService.remove(id)
    if (deleted.affected <= 1)
      return {
        type: MessageTypes.success,
        message: 'Location deleted',
        statusCode: 200,
      }

    return {
      type: MessageTypes.error,
      message: 'Delete action went very wrong.',
      statusCode: 400,
    }
  }
}
