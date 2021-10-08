import { IsString, Length, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  username: string;

  @IsString()
  @Length(2, 50)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 30)
  password: string;

  @IsOptional()
  image: string;

  @IsOptional()
  bio: string;

  @IsNotEmpty()
  birth: string;

  created: Date;
  updated: Date;
}
