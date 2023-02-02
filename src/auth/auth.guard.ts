import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { UserEntity } from 'src/users/entity/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    console.log(ctx.req.body);
    const { email, password } = ctx.req.body.variables;

    const user: UserEntity = await this.userService.findUserByEmail(email);
    if (user && user.password === password) {
      ctx.user = user;
      return true;
    } else {
      throw new HttpException('UnAuthenticated', HttpStatus.UNAUTHORIZED);
    }
  }
}
/*
    
*/
