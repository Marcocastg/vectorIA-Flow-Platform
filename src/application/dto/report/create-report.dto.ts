import { Transform, Type } from "class-transformer";
import { IsNotEmpty, IsString, IsUUID, Matches, MaxLength, MinLength, IsNumber, Min, Max, IsOptional, IsDate, IsObject, ValidateNested } from 'class-validator';

export class createReportDto{

    @IsOptional() 
    @IsDate()
    @Type(() => Date)
    createdAt?: Date;
    
    @IsOptional()
    @IsUUID(4,{message: 'userId must be in UUID format.'})
    @IsString({message: 'userId must be a String type.'})
    @IsNotEmpty({message: 'userId must not be empty.'})
    @Transform(({ value }) => (value as string).trim().toLowerCase().replaceAll(' ',''))
    userId?: string;

    @IsObject() 
    @ValidateNested()
    @Type(() => inputDataDto)
    inputData: JSON;
    
    @IsObject()
    @ValidateNested()
    @Type(() => predictionDataDto)
    predictionData: JSON;

    @MinLength(1, {message: 'channelName must have at least 1 character.'})
    @MaxLength(200, {message: 'channelName must have less than 2000 characters.'})
    @IsString({message: 'channelName must be a String type.'})
    @IsNotEmpty({message: 'channelName must not be empty.'})
    @Transform(({ value }) => value.trim().replace(/\s+/g, ' '))
    channelName: string;

    @MinLength(1, {message: 'platformName must have at least 1 character.'})
    @MaxLength(200, {message: 'platformName must have less than 2000 characters.'})
    @IsString({message: 'platformName must be a String type.'})
    @IsNotEmpty({message: 'platformName must not be empty.'})
    @Transform(({ value }) => value.trim().replace(/\s+/g, ' '))
    platformName: string;

    @MinLength(1, {message: 'aiAnalysis must have at least 1 character.'})
    @MaxLength(2000, {message: 'aiAnalysis must have less than 2000 characters.'})
    @IsString({message: 'aiAnalysis must be a String type.'})
    @IsNotEmpty({message: 'aiAnalysis must not be empty.'})
    @Transform(({ value }) => value.trim().replace(/\s+/g, ' '))
    aiAnalysis: string;
}

class inputDataDto{
    @Min(0.0)
    @Max(9999999999)
    @IsNumber({},{message: 'followers_1 must be a Number type(Integer/Float/Decimal).'})
    followers_1: number;

    @Min(0.0)
    @Max(9999999999)
    @IsNumber({},{message: 'followers_2 must be a Number type(Integer/Float/Decimal).'})
    followers_2: number;

    @Min(0.0)
    @Max(9999999999)
    @IsNumber({},{message: 'avg_viewers_1 must be a Number type(Integer/Float/Decimal).'})
    avg_viewers_1: number;

    @Min(0.0)
    @Max(9999999999)
    @IsNumber({},{message: 'avg_viewers_2 must be a Number type(Integer/Float/Decimal).'})
    avg_viewers_2: number;

    @IsOptional()
    @Min(0.0)
    @Max(44641)
    @IsNumber({},{message: 'time_streamed_1 must be a Number type(Integer/Float/Decimal).'})
    time_streamed_1?: number;

    @IsOptional()
    @Min(0.0)
    @Max(44641)
    @IsNumber({},{message: 'time_streamed_2 must be a Number type(Integer/Float/Decimal).'})
    time_streamed_2?: number;

    @IsOptional()
    @Min(0.0)
    @Max(9999999999)
    @IsNumber({},{message: 'comments_most_viewed must be a Number type(Integer/Float/Decimal).'})
    comments_most_viewed?: number;
    
    @IsOptional()
    @Min(0.0)
    @Max(9999999999)
    @IsNumber({},{message: 'comments_least_viewed must be a Number type(Integer/Float/Decimal).'})
    comments_least_viewed?: number;

    [key: string]: any;
}

class predictionDataDto{
    
    @Min(0.0)
    @Max(9999999999)
    @IsNumber({},{message: 'followers_prediction must be a Number type(Integer/Float/Decimal).'})
    followers_prediction: number;

    @Min(0.0)
    @Max(9999999999)
    @IsNumber({},{message: 'avg_viewers_prediction must be a Number type(Integer/Float/Decimal).'})
    avg_viewers_prediction: number;

    @IsNumber({},{message: 'growth_net must be a Number type(Integer/Float/Decimal).'})
    growth_net: number;

    [key: string]: any;
}