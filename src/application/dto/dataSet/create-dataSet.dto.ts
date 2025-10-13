import { Transform } from "class-transformer";
import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, IsUrl, IsUUID, Matches, Max, MaxLength, Min, MinLength } from "class-validator";


export class createdataSetDto{

    @MinLength(1, {message: 'channelName must have at least 1 character.'})
    @MaxLength(50, {message: 'channelName must have less than 50 characters.'})
    @IsString({message: 'channelName must be a String type.'})
    @IsNotEmpty({message: 'channelName must not be empty.'})
    @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 ]+$/, {
    message: 'channelName can only contain letters, numbers and spaces.',
    })
    @Transform(({ value }) => value.trim().replace(/\s+/g, ' '))
    channelName: string;

    @Min(0.0, {message: 'averageViewers must be at least 0.0.'})
    @Max(999999999, {message: 'averageViewers must be less than 1,000,000,000.'})
    @IsNumber({},{message: 'averageViewers must be a Number type(Integer/Float/Decimal).'})
    @Transform(({ value }) => value.trim().replace(/\s+/g, ' '))
    averageViewers: number;

    @Min(0.0, {message: 'hoursWatched must be at least 0.0.'})
    @Max(999999999, {message: 'hoursWatched must be less than 1,000,000,000.'})
    @IsNumber({},{message: 'hoursWatched must be a Number type(Integer/Float/Decimal).'})
    @Transform(({ value }) => value.trim().replace(/\s+/g, ' '))
    hoursWatched: number;

    @Min(0.0, {message: 'maxViewers must be at least 0.0.'})
    @Max(999999999, {message: 'maxViewers must be less than 1,000,000,000.'})
    @IsNumber({},{message: 'maxViewers must be a Number type(Integer/Float/Decimal).'})
    @Transform(({ value }) => value.trim().replace(/\s+/g, ' '))
    maxViewers: number;

    @Min(0.0, {message: 'minutesStreamed must be at least 0.0.'})
    @Max(999999999, {message: 'minutesStreamed must be less than 1,000,000,000.'})
    @IsNumber({},{message: 'minutesStreamed must be a Number type(Integer/Float/Decimal).'})
    @Transform(({ value }) => value.trim().replace(/\s+/g, ' '))
    minutesStreamed: number;

    @Min(0.0, {message: 'followersGained must be at least 0.0.'})
    @Max(999999999, {message: 'followersGained must be less than 1,000,000,000.'})
    @IsNumber({},{message: 'followersGained must be a Number type(Integer/Float/Decimal).'})
    @Transform(({ value }) => value.trim().replace(/\s+/g, ' '))
    followersGained: number;

    @Min(0.0, {message: 'totalFollowers must be at least 0.0.'})
    @Max(999999999, {message: 'totalFollowers must be less than 1,000,000,000.'})
    @IsNumber({},{message: 'totalFollowers must be a Number type(Integer/Float/Decimal).'})
    @Transform(({ value }) => value.trim().replace(/\s+/g, ' '))
    totalFollowers: number;

    @Min(0.0, {message: 'rank must be at least 0.0.'})
    @Max(999999999, {message: 'rank must be less than 1,000,000,000.'})
    @IsNumber({},{message: 'rank must be a Number type(Integer/Float/Decimal).'})
    @Transform(({ value }) => value.trim().replace(/\s+/g, ' '))
    rank: number;

    @MinLength(1, {message: 'fechaRegistro must have at least 1 character.'})
    @MaxLength(100, {message: 'fechaRegistro must have less than 100 characters.'})
    @IsString({message: 'fechaRegistro must be a String type.'})
    @IsNotEmpty({message: 'fechaRegistro must not be empty.'})
    @Transform(({ value }) => value.trim().replace(/\s+/g, ' '))
    fechaRegistro: string;

}