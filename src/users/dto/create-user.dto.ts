import { IsString, Length, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 50)
  email: string;

  @IsOptional()
  img: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 30)
  password: string;

  @IsString()
  @Length(2, 50)
  displayName: string;

  @IsNotEmpty()
  birth: string;

  @IsOptional()
  bio: string;
}
