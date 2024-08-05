import { IsInt, IsPositive,  } from 'class-validator';


export class PaginationDto {

    @IsInt()
    @IsPositive() 
    limit?: number;
    
    @IsInt()
    offset?: number;
    
}