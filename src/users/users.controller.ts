import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '.prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly db: UsersService) {}

  @Post('create-account')
  create(@Body() createUserDto: CreateUserDto) {
    return this.db.create(createUserDto);
  }

  @Get('list')
  async index(): Promise<User[]> {
    return this.db.getAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findUnique(@Param('id') id: number) {
    return this.db.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.db.update(+id, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  @Delete('/delete/:id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.db.remove(id);
  }
}
