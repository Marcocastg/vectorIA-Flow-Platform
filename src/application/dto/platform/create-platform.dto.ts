import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength, IsUrl } from "class-validator";


export class createPlatformDto{

    @MinLength(1, {message: 'Name must have at least 1 character.'})
    @MaxLength(50, {message: 'Name must have less than 50 characters.'})
    @IsString({message: 'Name must be a String type.'})
    @IsNotEmpty({message: 'Name must not be empty.'})
    @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 ]+$/, {
    message: 'Name can only contain letters, numbers and spaces.',
    })
    @Transform(({ value }) => value.trim().replace(/\s+/g, ' '))
    name: string;


    @MinLength(1, {message: 'Url must have at least 1 character.'})
    @MaxLength(255, {message: 'Url must have less than 255 characters.'})
    @IsString({message: 'Url must be a String type.'})
    @IsUrl({},{message: 'Url must be a valid URL.'})
    @IsNotEmpty({message: 'Url must not be empty.'})
    @Transform(({ value }) => value.trim().replace(/\s+/g, ' '))
    url: string;

    @MinLength(1, {message: 'logoUrl must have at least 1 character.'})
    @MaxLength(255, {message: 'logoUrl must have less than 255 characters.'})
    @IsString({message: 'logoUrl must be a String type.'})
    @IsUrl({},{message: 'logoUrl must be a valid URL.'})
    @IsNotEmpty({message: 'logoUrl must not be empty.'})
    @Transform(({ value }) => value.trim().replace(/\s+/g, ' '))
    logoUrl: string;
    
}