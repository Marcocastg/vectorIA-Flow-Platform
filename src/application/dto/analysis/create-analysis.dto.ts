import { Transform } from "class-transformer";
import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, IsUUID, Matches, Max, MaxLength, Min, MinLength } from "class-validator";


export class createAnalysisDto{

    @MinLength(1, {message: 'title must have at least 1 character.'})
    @MaxLength(255, {message: 'title must have less than 255 characters.'})
    @IsString({message: 'title must be a String type.'})
    @IsNotEmpty({message: 'title must not be empty.'})
    @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 ]+$/, {
    message: 'title can only contain letters, numbers and spaces.',
    })
    @Transform(({ value }) => value.trim().replace(/\s+/g, ' '))
    title: string;

    @IsUUID(4,{message: 'userId must be in UUID format.'})
    @IsString({message: 'userId must be a String type.'})
    @IsNotEmpty({message: 'userId must not be empty.'})
    @Transform(({ value }) => (value as string).trim().toLowerCase().replaceAll(' ',''))
    userId: string;

    @IsUUID(4,{message: 'channelId must be in UUID format.'})
    @IsString({message: 'channelId must be a String type.'})
    @IsNotEmpty({message: 'channelId must not be empty.'})
    @Transform(({ value }) => (value as string).trim().toLowerCase().replaceAll(' ',''))
    channelId: string;


}