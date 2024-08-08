import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService],
  imports: [
    TypeOrmModule.forFeature([ Movie ]),
    AuthModule,
  ]

})
export class MoviesModule {}
