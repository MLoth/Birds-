import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateLivelocationInput } from './dto/create-livelocation.input'
import { Livelocation } from './entities/livelocation.entity'

@Injectable()
export class LivelocationsService {
  constructor(
    @InjectRepository(Livelocation)
    private readonly locationRepository: Repository<Livelocation>,
  ) {}

  create(createLivelocationInput: CreateLivelocationInput) {
    console.log('Aanmaken live location')
    const location = new Livelocation()
    location.userId = createLivelocationInput.userId
    location.geolocation = createLivelocationInput.geolocation
    return this.locationRepository.save(location)
  }

  findLastByUserID(userId: string) {
    return this.locationRepository.findOne({
      order: { createdAt: 'DESC' },
      where: { userId },
    })
    // return this.locationRepository.findOneBy({ userId })
  }

  // findAll() {
  //   return `This action returns all livelocations`
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} livelocation`
  // }

  // update(id: number, updateLivelocationInput: UpdateLivelocationInput) {
  //   return `This action updates a #${id} livelocation`
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} livelocation`
  // }
}
