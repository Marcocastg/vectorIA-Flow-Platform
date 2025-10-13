import { Transform } from "class-transformer";
import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, IsUrl, IsUUID, Matches, Max, MaxLength, Min, MinLength } from "class-validator";


export class createLivestreamDto{

    @MinLength(1, {message: 'Name must have at least 1 character.'})
    @MaxLength(50, {message: 'Name must have less than 50 characters.'})
    @IsString({message: 'Name must be a String type.'})
    @IsNotEmpty({message: 'Name must not be empty.'})
    @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 ]+$/, {
    message: 'Name can only contain letters, numbers and spaces.',
    })
    @Transform(({ value }) => value.trim().replace(/\s+/g, ' '))
    title: string;

    @MinLength(1, {message: 'thumbnailUrl must have at least 1 character.'})
    @MaxLength(255, {message: 'thumbnailUrl must have less than 255 characters.'})
    @IsString({message: 'thumbnailUrl must be a String type.'})
    @IsUrl({},{message: 'thumbnailUrl must be a valid URL.'})
    @IsNotEmpty({message: 'thumbnailUrl must not be empty.'})
    @Transform(({ value }) => value.trim().replace(/\s+/g, ' '))
    thumbnailUrl: string;

    @MinLength(1, {message: 'language must have at least 1 character.'})
    @MaxLength(50, {message: 'language must have less than 50 characters.'})
    @IsString({message: 'language must be a String type.'})
    @IsNotEmpty({message: 'language must not be empty.'})
    @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 ]+$/, {
    message: 'language can only contain letters, numbers and spaces.',
    })
    @Transform(({ value }) => value.trim().replace(/\s+/g, ' '))
    language: string;

    @MinLength(1, {message: 'startedAt must have at least 1 character.'})
    @MaxLength(100, {message: 'startedAt must have less than 100 characters.'})
    @IsString({message: 'startedAt must be a String type.'})
    @IsNotEmpty({message: 'startedAt must not be empty.'})
    @Transform(({ value }) => value.trim().replace(/\s+/g, ' '))
    startedAt: string;

    @Min(0.0, {message: 'currentViewers must be at least 0.0.'})
    @Max(999999999, {message: 'currentViewers must be less than 1,000,000,000.'})
    @IsNumber({},{message: 'currentViewers must be a Number type(Integer/Float/Decimal).'})
    @Transform(({ value }) => value.trim().replace(/\s+/g, ' '))
    currentViewers: number;

    @IsOptional()
    @IsBoolean({message: 'matureContent must be a boolean type.'})
    matureContent: boolean;

    @IsUUID(4,{message: 'channelId must be in UUID format.'})
    @IsString({message: 'channelId must be a String type.'})
    @IsNotEmpty({message: 'channelId must not be empty.'})
    @Transform(({ value }) => (value as string).trim().toLowerCase().replaceAll(' ',''))
    channelId: string;

    @IsUUID(4,{message: 'categoryId must be in UUID format.'})
    @IsString({message: 'categoryId must be a String type.'})
    @IsNotEmpty({message: 'categoryId must not be empty.'})
    @Transform(({ value }) => (value as string).trim().toLowerCase().replaceAll(' ',''))
    categoryId: string;

}