import { IsString, Length, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTweetDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 280)
  text: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
