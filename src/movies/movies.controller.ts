import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe  } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PaginationDto } from './../common/dtos/pagination.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { User } from 'src/auth/entities/user.entity';
import { Movie } from './entities/movie.entity';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post('create')
  @Auth( ValidRoles.user )
  @ApiResponse({status: 201, description: 'Movies was create', type: Movie})
  @ApiResponse({status: 400, description: 'Bad Reaquest' })
  @ApiResponse({status: 403, description: 'Forbidden, Token related.' })
  create(
    @Body() createMovieDto: CreateMovieDto,
    @GetUser() user: User
  ) {
    return this.moviesService.create(createMovieDto, user);
  }

  @Get(':title')
  @Auth(ValidRoles.user)
  caificationProMovie(@Param( 'title' ) title: string) {
    return this.moviesService.promedioMovie( title );
  }

  @Post('favorites')
  @Auth(ValidRoles.user)
  findOne( 
    @Body() paginationDto:PaginationDto,
    @GetUser() user: User
  ) {
    return this.moviesService.findAllFavorites(paginationDto, user);
  }

  @Patch(':id')
  @Auth(ValidRoles.user)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMovieDto: UpdateMovieDto,
    @GetUser() user: User
) {
    return this.moviesService.update(id, updateMovieDto, user);
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

}
