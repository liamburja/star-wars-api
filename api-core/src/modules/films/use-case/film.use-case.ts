
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
  constructor(repository: FilmRepository) {
    super(repository, 'film');
  }
}