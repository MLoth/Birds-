import { Test, TestingModule } from '@nestjs/testing'
import {
  ClientMessage,
  MessageTypes,
} from '../bootstrap/entities/ClientMessage'
import { BirdsResolver } from './birds.resolver'
import { BirdsService } from './birds.service'
import { CreateBirdInput } from './dto/create-bird.input'
import { Bird } from './entities/bird.entity'
import { createBird, createBirdInputStub } from './stubs/bird.stub'

describe('BirdsResolver', () => {
  let resolver: BirdsResolver
  let service: BirdsService
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BirdsResolver,
        //BirdsService,
        {
          provide: BirdsService,
          useValue: {
            create: jest.fn().mockResolvedValue(createBird()),
            findAll: jest.fn().mockResolvedValue([createBird()]),
            findOne: jest.fn().mockResolvedValue(createBird()),
            update: jest.fn().mockResolvedValue(createBird()),
            remove: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
      ],
    }).compile()

    resolver = module.get<BirdsResolver>(BirdsResolver)
    service = module.get<BirdsService>(BirdsService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  describe('createBird', () => {
    let createBirdDTO: CreateBirdInput
    let resultBird: Bird

    beforeEach(async () => {
      createBirdDTO = createBirdInputStub()
      resultBird = await resolver.createBird(createBirdDTO)
    })

    describe('when createBird is called', () => {
      it('should call the service create method', async () => {
        expect(service.create).toBeCalledTimes(1)
      })
      it('should return the created bird', async () => {
        //result of the resolver is equal to the result of the mocked service
        expect(resultBird).toEqual(createBird())
      })
    })
  })

  //TODO: add tests for the other methods
  describe('findAll', () => {
    let result: Bird[]

    beforeEach(async () => {
      result = await resolver.findAll()
    })

    describe('When this function is called.', () => {
      it('Should call birdService.findAll', () => {
        expect(service.findAll).toBeCalledTimes(1)
      })

      // Remark:
      // Bird[]
      // [Bird]

      it('Should return some (or one) bird(s).', () => {
        expect(result).toEqual([createBird()])
      })
    })
  })

  describe('findOne', () => {
    let result: Bird

    beforeEach(async () => {
      result = await resolver.findOne(createBird().id)
    })

    describe('Check service findOne implementation', () => {
      it('Should call birdService correct.', () => {
        expect(service.findOne).toBeCalledTimes(1)
        expect(service.findOne).toBeCalledWith(createBird().id)
      })

      it('Should return the created bird.', () => {
        expect(result).toEqual(createBird())
      })
    })
  })

  describe('update', () => {
    let result: Bird

    beforeEach(async () => {
      result = await resolver.updateBird(createBird())
    })

    describe('Check service update implementation', () => {
      it('Should call birdService correct.', () => {
        expect(service.update).toBeCalledTimes(1)
        expect(service.update).toBeCalledWith(createBird())
      })

      it('Should return the updated bird.', () => {
        expect(result).toEqual(createBird())
      })
    })
  })

  describe('remove', () => {
    let result: ClientMessage

    beforeEach(async () => {
      result = await resolver.removeBird(createBird().id)
    })

    describe('Check the service implementation', () => {
      it('Is the remove function called correctly?', () => {
        expect(service.remove).toBeCalledTimes(1)
        expect(service.remove).toBeCalledWith(createBird().id)
      })
    })

    describe('Check the GraphQL return', () => {
      it('Is the message clear to the frontend?', async () => {
        const expectResult: ClientMessage = {
          type: MessageTypes.success,
          statusCode: 200,
          message: 'Bird deleted',
        }

        expect(result).toEqual(expectResult)
      })

      it('Is the error message shown when something goes wrong?', async () => {
        jest
          .spyOn(service, 'remove')
          .mockResolvedValue({ affected: 1000, raw: '' })

        result = await resolver.removeBird(createBird().id)

        const expectResult: ClientMessage = {
          type: MessageTypes.error,
          statusCode: 400,
          message: 'Delete action went very wrong.',
        }

        expect(result).toEqual(expectResult)
      })
    })
  })
})
