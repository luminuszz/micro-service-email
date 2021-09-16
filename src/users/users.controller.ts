import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @MessagePattern('user-was-created')
  async create(@Payload() createUser: CreateUserDTO) {
    return this.userService.createUser(createUser);
  }
}
