import { Transform } from "class-transformer";
import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, IsUUID, Matches, Max, MaxLength, Min, MinLength } from "class-validator";


export class createChannelDto{

    @MinLength(1, {message: 'Name must have at least 1 character.'})
    @MaxLength(50, {message: 'Name must have less than 50 characters.'})
    @IsString({message: 'Name must be a String type.'})
    @IsNotEmpty({message: 'Name must not be empty.'})
    @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 ]+$/, {
    message: 'Name can only contain letters, numbers and spaces.',
    })
    @Transform(({ value }) => value.trim().replace(/\s+/g, ' '))
    name: string;

    @Min(0.0, {message: 'followers must be at least 0.0.'})
    @Max(999999999, {message: 'followers must be less than 1,000,000,000.'})
    @IsNumber({},{message: 'followers must be a Number type(Integer/Float/Decimal).'})
    followers: number;

    @MinLength(1, {message: 'lastSeenAt must have at least 1 character.'})
    @MaxLength(100, {message: 'lastSeenAt must have less than 100 characters.'})
    @IsString({message: 'lastSeenAt must be a String type.'})
    @IsNotEmpty({message: 'lastSeenAt must not be empty.'})
    @Transform(({ value }) => value.trim().replace(/\s+/g, ' '))
    lastSeenAt: string;

    @MinLength(1, {message: 'description must have at least 1 character.'})
    @MaxLength(2000, {message: 'description must have less than 2000 characters.'})
    @IsString({message: 'description must be a String type.'})
    @IsNotEmpty({message: 'description must not be empty.'})
    @Transform(({ value }) => value.trim().replace(/\s+/g, ' '))
    description: string;

    @IsUUID(4,{message: 'platformId must be in UUID format.'})
    @IsString({message: 'platformId must be a String type.'})
    @IsNotEmpty({message: 'platformId must not be empty.'})
    @Transform(({ value }) => (value as string).trim().toLowerCase().replaceAll(' ',''))
    platformId: string;

}