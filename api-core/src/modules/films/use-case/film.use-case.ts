import { Service } from 'typedi';
import { BaseUseCase } from '../../base/base.use-case';
import { FilmRepository } from '../repository/film.repository';
import { CreateFilmDTO, IFilmDocument, UpdateFilmDTO } from '../interfaces/film.interfaces';
import { Film } from '../schemas/film.schema';
import { StarWarsApiService } from '../../../services/star-wars.api';

@Service()
export class FilmUseCase extends BaseUseCase<
  IFilmDocument,
  Film,
  CreateFilmDTO,
  UpdateFilmDTO
> {
  starWarsService: StarWarsApiService;
  constructor(repository: FilmRepository, starWarsService: StarWarsApiService) {
    super(repository);
    this.starWarsService = starWarsService;
  }
}