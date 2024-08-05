import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { validate as isUUID } from 'uuid';


@Injectable()
export class MoviesService {

  private readonly logger = new Logger('MoviesService')


  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>
  ){}

  async create(createMovieDto: CreateMovieDto) {

    try {
      const movie = this.movieRepository.create(createMovieDto)
      await this.movieRepository.save(movie)

      return movie
      
    } catch (error) {

      this.handleDbExceptions(error)
      
    }
  }

  findAll() {
    return this.movieRepository.find({});
  }

  async findAllFavorites(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0, } = paginationDto;
    const movie = await this.movieRepository.createQueryBuilder('movie')
    .where('movie.favorite = :favorite', { favorite: '1' })
    .skip(offset)
    .take(limit)
    .getManyAndCount();

    if (!movie) {
      throw new NotFoundException(`movie with favorite  not found`)
    }

    return movie
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {

    const movie = await this.movieRepository.preload({
      id: id,
      ...updateMovieDto
    })

    if (!movie) {
      throw new NotFoundException(`Movie with id: ${id} not fount`)
    }

    
    try {
      await this.movieRepository.save(movie);
      return movie
      
    } catch (error) {
      this.handleDbExceptions(error)
    }
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }

  async promedioMovie( title: string ) {

    const movies = await this.movieRepository.find({ where: { title } });

    if (movies.length === 0) {
      throw new NotFoundException(`No movies found with title ${title}`);
    }

    // Calcular el promedio de qualification
    const totalQualification = movies.reduce((sum, movie) => sum + movie.qualification, 0);
    const averageQualification = totalQualification / movies.length;

    return { Promedio: averageQualification };
  }

  private handleDbExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail)
    }

    
    console.log(error)
      
    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server logs')
  }
}
