import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ObjectId } from 'mongodb'

import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { User } from './entities/user.entity'
import { Observation } from 'src/observations/entities/observation.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(createUserInput: CreateUserInput) {
    return this.userRepository.save(createUserInput)
  }

  // TODO: Everyone can get all the users... ☹️
  findAll() {
    return this.userRepository.find()
  }

  findOne(id: string) {
    return this.userRepository.findOne(new ObjectId(id))
  }

  findOneBy(uid: string) {
    return this.userRepository.findOneBy({ uid })
  }

  update(updateUserInput: UpdateUserInput) {
    const update = new User()
    update.id = new ObjectId(updateUserInput.id)
    update.uid = updateUserInput.uid
    update.observations = updateUserInput.observations
    update.observationsCount = updateUserInput.observationsCount
    return this.userRepository.save(update)
  }

  remove(id: string) {
    return this.userRepository.delete(new ObjectId(id))
  }

  async incrementObservation(
    uid: string,
    observations: Observation[],
  ): Promise<void> {
    const u: User = await this.findOneBy(uid)

    u.observations = u.observations
      ? [...observations, ...u.observations]
      : [...observations]
    u.observationsCount = u.observationsCount + observations.length

    await this.userRepository.save(u)
  }
}
