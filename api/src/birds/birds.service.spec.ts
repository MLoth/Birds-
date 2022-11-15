import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BirdsService } from './birds.service'
import { Bird } from './entities/bird.entity'
import { createBirdInputStub, createBird } from './stubs/bird.stub'
import { ObjectId } from 'mongodb'
describe('BirdsService', () => {
  let service: BirdsService
  let mockBirdRepository: Repository<Bird>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BirdsService,
        {
          provide: getRepositoryToken(Bird),
          useValue: {
            save: jest.fn().mockResolvedValue(createBird()),
            find: jest.fn().mockResolvedValue([createBird()]),
            findOne: jest.fn().mockResolvedValue(createBird()),
            delete: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<BirdsService>(BirdsService)
    mockBirdRepository = module.get<Repository<Bird>>(getRepositoryToken(Bird))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    describe('when create is called', () => {
      it('should call the repository save method', async () => {
        const saveSpy = jest.spyOn(mockBirdRepository, 'save')
        const newBird = new Bird()
        await service.create(newBird)
        expect(saveSpy).toBeCalledTimes(1)
      })

      it('should be called with the correct params', async () => {
        const saveSpy = jest.spyOn(mockBirdRepository, 'save')
        //const newBird = new Bird()
        const newBird = createBirdInputStub() //<- function that creates a CreateInputBird object
        await service.create(newBird)
        expect(saveSpy).toBeCalledWith(newBird)
      })

      it('should return the created bird', async () => {
        const newBird = createBirdInputStub()
        const toReturndBird = createBird()

        const result = await service.create(newBird)
        expect(result).toEqual(toReturndBird)
      })
    })
  })

  describe('findAll', () => {
    describe('when findAll is called', () => {
      it('should call the repository find method', async () => {
        const findSpy = jest.spyOn(mockBirdRepository, 'find')
        await service.findAll()
        expect(findSpy).toBeCalledTimes(1)
      })

      it('should return the list of birds', async () => {
        const toReturndBird = createBird()
        const result = await service.findAll()
        expect(result).toEqual([toReturndBird])
      })
    })
  })

  describe('findOne', () => {
    describe('when findOne is called', () => {
      it('should call the repository findOne method', async () => {
        const findSpy = jest.spyOn(mockBirdRepository, 'findOne')
        await service.findOne('d89a0bA4cc619d347024f42e')
        expect(findSpy).toBeCalledTimes(1)
      })

      it('should be called with the correct params', async () => {
        const findSpy = jest.spyOn(mockBirdRepository, 'findOne')
        await service.findOne('d89a0bA4cc619d347024f42e')
        expect(findSpy).toBeCalledWith(new ObjectId('d89a0bA4cc619d347024f42e'))
      })

      it('should return a bird', async () => {
        const toReturndBird = createBird()
        const result = await service.findOne('d89a0bA4cc619d347024f42e')
        expect(result).toEqual(toReturndBird)
      })
    })
  })

  describe('update', () => {
    describe('when update is called', () => {
      it('should call the repository save method', async () => {
        const saveSpy = jest.spyOn(mockBirdRepository, 'save')
        const newBird = createBird()
        await service.update(newBird)
        expect(saveSpy).toBeCalledTimes(1)
      })

      it('should be called with the correct params', async () => {
        const saveSpy = jest.spyOn(mockBirdRepository, 'save')
        const newBird = createBird()
        await service.update(newBird)
        expect(saveSpy).toBeCalledWith(newBird)
      })

      it('should return the updated bird', async () => {
        const newBird = createBird()
        const toReturndBird = createBird()
        const result = await service.update(newBird)
        expect(result).toEqual(toReturndBird)
      })
    })
  })

  describe('remove', () => {
    describe('when remove is called', () => {
      it('should call the repository delete method', async () => {
        const deleteSpy = jest.spyOn(mockBirdRepository, 'delete')
        const newBird = createBird()
        await service.remove(newBird.id)
        expect(deleteSpy).toBeCalledTimes(1)
      })
    })
  })
})
