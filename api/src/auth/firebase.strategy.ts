import {
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-http-bearer'
import { auth, FirebaseError } from 'firebase-admin'
import * as firebaseAdmin from 'firebase-admin'

import { FirebaseService } from './services/firebase.service'

type DecodedIdToken = firebaseAdmin.auth.DecodedIdToken
export type FirebaseAuthDecodedUser = Readonly<
  Pick<DecodedIdToken, 'uid' | 'email' | 'email_verified'>
>

export const StrategyName = 'firebase-auth'

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
  Strategy,
  StrategyName,
) {
  private readonly checkRevoked = false
  private readonly logger = new Logger(FirebaseAuthStrategy.name)

  constructor(private readonly firebase: FirebaseService) {
    super()
  }

  async validate(jwtToken: string): Promise<auth.UserRecord> {
    const payload = await this.authorize(jwtToken)
    const user = await this.firebase.getAuth().getUser(payload.uid)

    if (user.disabled) {
      throw new ForbiddenException()
    }
    return user
  }

  private async authorize(jwtToken: string): Promise<DecodedIdToken> {
    try {
      return await this.firebase
        .getAuth()
        .verifyIdToken(jwtToken, this.checkRevoked)
    } catch (err: unknown) {
      const e = err as FirebaseError
      if (e.code === 'auth/id-token-expired') {
        this.logger.warn('auth/id-token-expired')
      } else if (e.code === 'auth/id-token-revoked') {
        this.logger.warn('auth/id-token-revoked')
      }

      throw new UnauthorizedException()
    }
  }
}
