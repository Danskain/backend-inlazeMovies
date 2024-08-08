import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive,  } from 'class-validator';


export class PaginationDto {

    @ApiProperty({
        default: 5,
        description: 'How many rows do you need'
    })
    @IsInt()
    @IsPositive() 
    limit?: number;
    
    @ApiProperty({
        default: 0,
        description: 'How many rows do you want skip'
    })
    @IsInt()
    offset?: number;
    
}