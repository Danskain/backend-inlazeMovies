import { ApiProperty } from '@nestjs/swagger';
import { IsInt,
    IsPositive, IsString, MinLength 
} from 'class-validator';

export class CreateMovieDto {


    @ApiProperty({
        example: 'interestear',
        description: 'Movie Title',
    })
    @IsString()
    @MinLength(1)
    title: string;

    @ApiProperty({
        example: 5,
        description: 'Movie qualification',
    })
    @IsInt()
    @IsPositive()
    qualification: number;


    @ApiProperty({
        example: '1 or 0',
        description: 'Movie favorite',
    })
    @IsString()
    @MinLength(1)
    favorite: string;
}
