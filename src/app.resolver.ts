import { UseGuards } from '@nestjs/common';
import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from './auth/auth.guard';
import { UserEntity } from './users/entity/user.entity';
import * as jwt from 'jsonwebtoken';

@Resolver(() => String)
export class AppResolver {
  @Query(() => String)
  index(): string {
    return `Nest Js Graph QL Server`;
  }

  @Query(() => String)
  @UseGuards(AuthGuard)
  login(
    @Args({ name: 'email', type: () => String }) email: string,
    @Args({ name: 'password', type: () => String }) password: string,
    @Context('user') user: UserEntity,
  ): string {
    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lasName,
      email: user.email,
      role: user.roles,
    };
    return jwt.sign(payload, 'key', { expiresIn: '600s' });
  }
}
