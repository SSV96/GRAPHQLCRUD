import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    public readonly userRepo: Repository<UserEntity>,
  ) {}
  async findUserByEmail(email: string) {
    const user: UserEntity = await this.userRepo.findOne({
      where: { email: email },
    });
    return user;
  }
}
