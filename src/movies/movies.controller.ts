import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe  } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PaginationDto } from './../common/dtos/pagination.dto';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post('create')
  @Auth( ValidRoles.user )
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get(':title')
  @Auth(ValidRoles.user)
  caificationProMovie(@Param( 'title' ) title: string) {
    return this.moviesService.promedioMovie( title );
  }

  @Post('favorites')
  @Auth(ValidRoles.user)
  findOne( @Body() paginationDto:PaginationDto) {
    return this.moviesService.findAllFavorites(paginationDto);
  }

  @Patch(':id')
  @Auth(ValidRoles.user)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMovieDto: UpdateMovieDto
) {
    return this.moviesService.update(id, updateMovieDto);
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

}
