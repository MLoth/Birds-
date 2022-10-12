import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ObjectId } from 'mongodb'

import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { User } from './entities/user.entity'

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
}
