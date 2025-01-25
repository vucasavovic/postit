import { IsNumber, IsString } from 'class-validator';

export class PostDto {

  @IsString()
  title: string;

  @IsString()
  content: string;
}
