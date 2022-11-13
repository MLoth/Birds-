import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const port: number = +process.env.PORT || 3003
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(port)

  console.info(
    `👋\nWelcome to the server.\nVisit ${await app.getUrl()}/graphql`,
  )
}

bootstrap()
