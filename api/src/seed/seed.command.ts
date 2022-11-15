import { Command } from 'nestjs-command'
import { Injectable } from '@nestjs/common'
import { DatabaseSeedService } from './seed.service'

@Injectable()
export class DatabaseSeedCommand {
  constructor(private readonly seedService: DatabaseSeedService) {}

  @Command({
    command: 'seed:database',
    describe: 'seed the database',
  })
  async seed() {
    console.log('🌱 Start seeding Birds')
    const r = await this.seedService.addAllBirds()
    console.log(r)
    console.log('🌱 Seeding Birds done 🏁')
    console.log('🌱 Start Locations Birds')
    const l = await this.seedService.addAllLocations()
    console.log(l)
    console.log('🌱 Seeding Locations done 🏁')
  }

  @Command({
    command: 'seed:reset',
    describe: 'delete all data from the database',
  })
  async delete() {
    console.log('🌱 Start deleting')
    await this.seedService.deleteAllBirds()
    console.log('🌱 Deleting done 🏁')
  }
}
