import {
  IsString,
  Length,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateTweetDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 280)
  text: string;

  @IsNumber()
  @IsOptional()
  userId: number;
}
