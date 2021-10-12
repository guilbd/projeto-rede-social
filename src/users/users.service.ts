import {
  Injectable,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '.prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private db: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    const existing = await this.db.user.findUnique({
      where: { username: data.username },
    });

    if (existing) {
      throw new ConflictException('username already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.db.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
    return user;
  }

  async getAll(): Promise<User[]> {
    return this.db.user.findMany({
      include: {
        follows: {
          select: {
            followedId: true,
          },
        },
        tweets: {
          select: {
            text: true,
          },
        },
        likes: {
          select: {
            userId: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const user = await this.db.user.findUnique({
      where: { id },
      include: {
        follows: {
          select: {
            followedId: true,
          },
        },
        tweets: {
          select: {
            text: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  @UseGuards(AuthGuard('jwt'))
  async update(id: number, data: UpdateUserDto): Promise<User> {
    return this.db.user.update({
      where: { id },
      data,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  async remove(id: number): Promise<User> {
    const userLogged = await this.db.user.findUnique({
      where: { id },
      select: {
        id: true,
      },
    });

    if (!userLogged) {
      throw new NotFoundException('Tweet não localizado');
    }

    if (userLogged.id !== id) {
      throw new UnauthorizedException('Você não possui permissão');
    }

    return this.db.user.delete({
      where: { id },
    });
  }
}
