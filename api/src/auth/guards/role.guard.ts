import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { UsersService } from 'src/users/users.service'

export const RolesGuard = (roles: string[]) => {
  @Injectable()
  class RolesGuardMixin implements CanActivate {
    constructor(readonly usersService: UsersService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const ctx = GqlExecutionContext.create(context)
      const user = ctx.getContext().req.user
      const { role } = await this.usersService.findOneBy(user.uid)

      // TODO: what if there are no roles required?
      // TODO: what if there are no roles on the user?
      return roles.includes(role.name)
    }
  }

  const guard = mixin(RolesGuardMixin)
  return guard
}
