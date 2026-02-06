import { StarWarsApiService } from '../../../services/star-wars.api';
import { Service } from 'typedi';
import { BaseUseCase } from '../../base/base.use-case';
import { CreateFilmDTO, IFilmDocument, UpdateFilmDTO } from '../interfaces/film.interfaces';
import { FilmRepository } from '../repository/film.repository';
import { Film } from '../schemas/film.schema';

@Service()
export class FilmUseCase extends BaseUseCase<
  IFilmDocument,
  Film,
  CreateFilmDTO,
  UpdateFilmDTO
> {
  starWarsService: StarWarsApiService;
  constructor(repository: FilmRepository, starWarsService: StarWarsApiService) {
    super(repository, 'film');
    this.starWarsService = starWarsService;
  }
}