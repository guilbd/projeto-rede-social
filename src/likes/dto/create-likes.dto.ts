import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateLikeDto {
  @IsNumber()
  @IsNotEmpty()
  like: number;

  @IsNumber()
  @IsNotEmpty()
  tweetId: number;
}
