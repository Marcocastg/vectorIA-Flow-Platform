import { Transform } from "class-transformer";
import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsNumberString, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";


export class createUserDto{

    @MinLength(1, {message: 'firstName must have at least 1 character.'})
    @MaxLength(50, {message: 'firstName must have less than 50 characters.'})
    @IsString({message: 'firstName must be a String type.'})
    @IsNotEmpty({message: 'firstName must not be empty.'})
    @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 ]+$/, {
    message: 'firstName can only contain letters, numbers and spaces.',
    })
    @Transform(({ value }) => value.trim().replace(/\s+/g, ' '))
    firstName: string;

    @MinLength(1, {message: 'lastName must have at least 1 character.'})
    @MaxLength(50, {message: 'lastName must have less than 50 characters.'})
    @IsString({message: 'lastName must be a String type.'})
    @IsNotEmpty({message: 'lastName must not be empty.'})
    @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 ]+$/, {
    message: 'lastName can only contain letters, numbers and spaces.',
    })
    @Transform(({ value }) => value.trim().replace(/\s+/g, ' '))
    lastName: string;

    @MinLength(1, {message: 'Password must have at least 1 character.'})
    @MaxLength(50, {message: 'Password must have less than 50 characters.'})
    @IsString({message: 'Password must be a String type.'})
    @IsNotEmpty({message: 'Password must not be empty.'})
    @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 ]+$/, {
    message: 'Password can only contain letters, numbers and spaces.',
    })
    @Transform(({ value }) => value.trim().replace(/\s+/g, ' '))
    password: string;

    @MinLength(1, {message: 'Email must have at least 1 character.'})
    @MaxLength(255, {message: 'Email must have less than 255 characters.'})
    @IsEmail({},{message: 'You must enter a valid Email.'})
    @IsNotEmpty({message: 'Email must not be empty.'})
    @Transform(({ value }) => (value as string).trim().toLowerCase().replaceAll(' ',''))
    email:string;

    @MinLength(1, {message: 'companyName must have at least 1 character.'})
    @MaxLength(255, {message: 'companyName must have less than 255 characters.'})
    @IsString({message: 'companyName must be a String type.'})
    @IsNotEmpty({message: 'companyName must not be empty.'})
    @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 ]+$/, {
    message: 'companyName can only contain letters, numbers and spaces.',
    })
    @Transform(({ value }) => value.trim().replace(/\s+/g, ' '))
    companyName: string;

}