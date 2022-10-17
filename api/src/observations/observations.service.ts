import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ObjectId } from 'mongodb'
import { Repository } from 'typeorm'

import { BirdsService } from 'src/birds/birds.service'
import { CreateObservationInput } from './dto/create-observation.input'
import { UpdateObservationInput } from './dto/update-observation.input'
import { Observation } from './entities/observation.entity'
import { LocationsService } from 'src/locations/locations.service'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class ObservationsService {
  constructor(
    @InjectRepository(Observation)
    private readonly observationRepository: Repository<Observation>,
    private readonly birdService: BirdsService,
    private readonly locationService: LocationsService,
    private readonly userService: UsersService,
  ) {}

  create(createObservationInput: CreateObservationInput): Promise<Observation> {
    const o = new Observation()
    o.name = createObservationInput.name
    o.description = createObservationInput.description
    o.weather = createObservationInput.weather
    o.userId = createObservationInput.userId
    o.birdId = createObservationInput.birdId
    o.geolocation = createObservationInput.geoPoint
    o.locationId = createObservationInput.locationId // TODO: something has been spotted on this location!
    o.active = createObservationInput.active

    console.log('USER', o.userId)

    this.birdService.incrementObservation(o.birdId)
    this.locationService.incrementLocation(o.locationId, [o])
    this.userService.incrementObservation(o.userId, [o])

    return this.observationRepository.save(o)
  }

  findAll(): Promise<Observation[]> {
    return this.observationRepository.find()
  }

  findOne(id: string): Promise<Observation> {
    return this.observationRepository.findOne(new ObjectId(id))
  }

  update(updateObservationInput: UpdateObservationInput) {
    const update = new Observation()
    update.id = updateObservationInput.id
    update.name = updateObservationInput.name
    update.description = updateObservationInput.description
    update.weather = updateObservationInput.weather
    update.birdId = updateObservationInput.birdId
    update.locationId = updateObservationInput.locationId
    update.geolocation = updateObservationInput.geoPoint
    update.active = updateObservationInput.active
    return this.observationRepository.save(update)
  }

  remove(id: string) {
    return this.observationRepository.delete(new ObjectId(id))
  }
}
