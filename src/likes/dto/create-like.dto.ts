import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateLikeDto {
  @IsNotEmpty()
  tweetId: number;

  @IsNumber()
  @IsOptional()
  userId: number;
}
