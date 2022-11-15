import { DataSource } from 'typeorm'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      sortSchema: true,
      autoSchemaFile: true,
    }),

    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mongodb',
        url: 'mongodb://localhost:27027/api',
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        synchronize: true, // Careful with this in production
        useNewUrlParser: true,
        useUnifiedTopology: true, // Disable deprecated warnings
      }),

      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize()
        return dataSource
      },
    }),
  ],
})
export class BootstrapModule {}
