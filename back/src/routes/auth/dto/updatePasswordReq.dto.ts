import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordReqDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
