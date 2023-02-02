import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthGuard } from './auth.guard';
import { JwtGuard } from './jwt.guard';
import { RoleGuard } from './role.guard';

@Module({
  imports: [UsersModule],
  providers: [AuthGuard, JwtGuard],
  exports: [],
})
export class AuthModule { }
