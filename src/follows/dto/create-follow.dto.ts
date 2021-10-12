import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFollowDto {
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  followedId: number;
}
