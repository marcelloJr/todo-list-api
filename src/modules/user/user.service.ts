import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import Message from '../../utils/messages/Users';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.repository.create(createUserDto);
    return this.repository
      .save(user)
      .then((user) => {
        delete user.password;
        return user;
      })
      .catch(() => {
        throw new HttpException(
          {
            message: Message.password.EMAIL_UNIQUE,
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  findAll(): Promise<User[]> {
    return this.repository.find().then((users) => {
      users.map((user) => {
        delete user.password;
      });
      return users;
    });
  }

  findOne(id: string): Promise<User> {
    return this.repository
      .findOne(id)
      .then((user) => {
        delete user.password;
        return user;
      })
      .catch(() => {
        throw new HttpException(
          {
            message: Message.USER_NOT_EXISTS,
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  async findByEmail(email: string): Promise<User> {
    return this.repository.findOne({ email });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    delete updateUserDto.password;

    const user = await this.repository
      .preload({
        id: id,
        ...updateUserDto,
      })
      .catch(() => {
        throw new HttpException(
          {
            message: Message.USER_NOT_EXISTS,
          },
          HttpStatus.BAD_REQUEST,
        );
      });

    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }

    return this.repository.save(user).then((user) => {
      delete user.password;
      return user;
    });
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return this.repository.remove(user);
  }
}
