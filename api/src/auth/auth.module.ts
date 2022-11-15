import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { FirebaseAuthStrategy } from './firebase.strategy'
import { FirebaseService } from './services/firebase.service'

@Module({
  imports: [PassportModule],
  providers: [FirebaseService, FirebaseAuthStrategy],
})
export class AuthModule {}
