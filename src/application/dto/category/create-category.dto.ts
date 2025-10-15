import { Transform } from "class-transformer";
import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, IsUUID, Matches, Max, MaxLength, Min, MinLength } from "class-validator";


export class createCategoryDto{

    @MinLength(1, {message: 'Name must have at least 1 character.'})
    @MaxLength(50, {message: 'Name must have less than 50 characters.'})
    @IsString({message: 'Name must be a String type.'})
    @IsNotEmpty({message: 'Name must not be empty.'})
    @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 ]+$/, {
    message: 'Name can only contain letters, numbers and spaces.',
    })
    @Transform(({ value }) => value.trim().replace(/\s+/g, ' '))
    name: string;

    @Min(0.0, {message: 'currentViewers must be at least 0.0.'})
    @Max(99999999, {message: 'currentViewers must be less than 100,000,000.'})
    @IsNumber({},{message: 'currentViewers must be a Number type(Integer/Float/Decimal).'})
    currentViewers: number;

    @IsUUID(4,{message: 'platformId must be in UUID format.'})
    @IsString({message: 'platformId must be a String type.'})
    @IsNotEmpty({message: 'platformId must not be empty.'})
    @Transform(({ value }) => (value as string).trim().toLowerCase().replaceAll(' ',''))
    platformId: string;

}