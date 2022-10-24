import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { UsersService } from 'src/users/users.service'

export const RolesGuard = (roles: string[] = []) => {
  @Injectable()
  class RoleGuardMixin implements CanActivate {
    constructor(readonly usersService: UsersService) {}

    async canActivate(context: ExecutionContext) {
      const ctx = GqlExecutionContext.create(context)
      const firebaseUser = ctx.getContext().req.user

      const { role } = await this.usersService.findOneBy(firebaseUser.uid)

      // TODO: check for the user's role
      console.log(role.name)
      console.log(firebaseUser, roles)
      return true
    }
  }

  const guard = mixin(RoleGuardMixin)
  return guard
}
