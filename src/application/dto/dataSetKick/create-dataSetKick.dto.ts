import { Transform } from "class-transformer";
import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, IsUrl, IsUUID, Matches, Max, MaxLength, Min, MinLength } from "class-validator";


export class createdataSetKickDto{

    @MinLength(1, {message: 'channelName must have at least 1 character.'})
    @MaxLength(50, {message: 'channelName must have less than 50 characters.'})
    @IsString({message: 'channelName must be a String type.'})
    @IsNotEmpty({message: 'channelName must not be empty.'})
    @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 ]+$/, {
    message: 'channelName can only contain letters, numbers and spaces.',
    })
    @Transform(({ value }) => value.trim().replace(/\s+/g, ' '))
    channelName: string;

    @MinLength(1, {message: 'channelPfp must have at least 1 character.'})
    @MaxLength(255, {message: 'channelPfp must have less than 255 characters.'})
    @IsString({message: 'channelPfp must be a String type.'})
    @IsUrl({},{message: 'channelPfp must be a valid URL.'})
    @IsNotEmpty({message: 'channelPfp must not be empty.'})
    @Transform(({ value }) => value.trim().replace(/\s+/g, ' '))
    channelPfp: string;

    @Min(0.0, {message: 'rank must be at least 0.0.'})
    @Max(999999999, {message: 'rank must be less than 1,000,000,000.'})
    @IsNumber({},{message: 'rank must be a Number type(Integer/Float/Decimal).'})
    rank: number;

    @Min(0.0, {message: 'averageViewers must be at least 0.0.'})
    @Max(999999999, {message: 'averageViewers must be less than 1,000,000,000.'})
    @IsNumber({},{message: 'averageViewers must be a Number type(Integer/Float/Decimal).'})
    averageViewers: number;

    @Min(0.0, {message: 'hoursWatched must be at least 0.0.'})
    @Max(999999999, {message: 'hoursWatched must be less than 1,000,000,000.'})
    @IsNumber({},{message: 'hoursWatched must be a Number type(Integer/Float/Decimal).'})
    hoursWatched: number;

    @Min(0.0, {message: 'maxViewers must be at least 0.0.'})
    @Max(999999999, {message: 'maxViewers must be less than 1,000,000,000.'})
    @IsNumber({},{message: 'maxViewers must be a Number type(Integer/Float/Decimal).'})
    maxViewers: number;

    @Min(0.0, {message: 'hoursStreamed must be at least 0.0.'})
    @Max(999999999, {message: 'hoursStreamed must be less than 1,000,000,000.'})
    @IsNumber({},{message: 'hoursStreamed must be a Number type(Integer/Float/Decimal).'})
    hoursStreamed: number;

    @Min(0.0, {message: 'totalFollowers must be at least 0.0.'})
    @Max(999999999, {message: 'totalFollowers must be less than 1,000,000,000.'})
    @IsNumber({},{message: 'totalFollowers must be a Number type(Integer/Float/Decimal).'})
    totalFollowers: number;

    @MinLength(1, {message: 'language must have at least 1 character.'})
    @MaxLength(50, {message: 'language must have less than 50 characters.'})
    @IsString({message: 'language must be a String type.'})
    @IsNotEmpty({message: 'language must not be empty.'})
    @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 ]+$/, {
    message: 'language can only contain letters, numbers and spaces.',
    })
    @Transform(({ value }) => value.trim().replace(/\s+/g, ' '))
    language: string;

    @Min(0.0, {message: 'rankVariation must be at least 0.0.'})
    @Max(999999999, {message: 'rankVariation must be less than 1,000,000,000.'})
    @IsNumber({},{message: 'rankVariation must be a Number type(Integer/Float/Decimal).'})
    rankVariation: number;

    @MinLength(1, {message: 'fechaRegistro must have at least 1 character.'})
    @MaxLength(100, {message: 'fechaRegistro must have less than 100 characters.'})
    @IsString({message: 'fechaRegistro must be a String type.'})
    @IsNotEmpty({message: 'fechaRegistro must not be empty.'})
    @Transform(({ value }) => value.trim().replace(/\s+/g, ' '))
    fechaRegistro: string;

    @IsUUID(4,{message: 'channelId must be in UUID format.'})
    @IsString({message: 'channelId must be a String type.'})
    @IsNotEmpty({message: 'channelId must not be empty.'})
    @Transform(({ value }) => (value as string).trim().toLowerCase().replaceAll(' ',''))
    channelId: string;

}