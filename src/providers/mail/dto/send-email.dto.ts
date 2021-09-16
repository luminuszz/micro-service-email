import { IsString, IsNotEmpty } from 'class-validator';

export class SendEmailDTO {
  @IsNotEmpty()
  @IsString()
  to: string;

  @IsNotEmpty()
  @IsString()
  from: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsString()
  text: string;
}
