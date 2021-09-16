import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../providers/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly baseRepository: BaseRepository) {}

  async createUser({ origin, ...user }: CreateUserDTO) {
    return this.baseRepository.user.create({
      data: {
        ...user,
        microServiceOrigin: origin,
      },
    });
  }
}
