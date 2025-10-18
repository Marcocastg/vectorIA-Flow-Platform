import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class LoginDto {
    @MinLength(1, {message: 'Email must have at least 1 character.'})
    @MaxLength(255, {message: 'Email must have less than 255 characters.'})
    @IsEmail({},{message: 'You must enter a valid Email.'})
    @IsNotEmpty({message: 'Email must not be empty.'})
    @Transform(({ value }) => (value as string).trim().toLowerCase().replaceAll(' ',''))
  email: string;

    @MinLength(1, {message: 'Password must have at least 1 character.'})
    @MaxLength(50, {message: 'Password must have less than 50 characters.'})
    @IsString({message: 'Password must be a String type.'})
    @IsNotEmpty({message: 'Password must not be empty.'})
    @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 ]+$/, {
    message: 'Password can only contain letters, numbers and spaces.',
    })
    @Transform(({ value }) => value.trim().replace(/\s+/g, ' '))
  password: string;
}