import { Transform } from "class-transformer";
import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, IsUrl, IsUUID, Matches, Max, MaxLength, Min, MinLength } from "class-validator";


export class createvideoOnDemandDto{

    @MinLength(1, {message: 'title must have at least 1 character.'})
    @MaxLength(255, {message: 'title must have less than 255 characters.'})
    @IsString({message: 'title must be a String type.'})
    @IsNotEmpty({message: 'title must not be empty.'})
    @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 ]+$/, {
    message: 'title can only contain letters, numbers and spaces.',
    })
    @Transform(({ value }) => value.trim().replace(/\s+/g, ' '))
    title: string;

    @Min(0.0, {message: 'duration must be at least 0.0.'})
    @Max(999999999, {message: 'duration must be less than 1,000,000,000.'})
    @IsNumber({},{message: 'duration must be a Number type(Integer/Float/Decimal).'})
    @Transform(({ value }) => value.trim().replace(/\s+/g, ' '))
    duration: number;

    @Min(0.0, {message: 'views must be at least 0.0.'})
    @Max(999999999, {message: 'views must be less than 1,000,000,000.'})
    @IsNumber({},{message: 'views must be a Number type(Integer/Float/Decimal).'})
    @Transform(({ value }) => value.trim().replace(/\s+/g, ' '))
    views: number;

    @IsOptional()
    @IsBoolean({message: 'matureContent must be a boolean type.'})
    matureContent: boolean;

    @IsUUID(4,{message: 'channelId must be in UUID format.'})
    @IsString({message: 'channelId must be a String type.'})
    @IsNotEmpty({message: 'channelId must not be empty.'})
    @Transform(({ value }) => (value as string).trim().toLowerCase().replaceAll(' ',''))
    channelId: string;
}