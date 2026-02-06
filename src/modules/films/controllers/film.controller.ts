import { Service } from 'typedi';
import { BaseController } from '../../base/base.controller';
import { FilmUseCase } from '../use-case/film.use-case';
import { IFilmDocument, CreateFilmDTO, UpdateFilmDTO } from '../interfaces/film.interfaces';
import { Film } from '../schemas/film.schema';

@Service()
export class FilmController extends BaseController<
  IFilmDocument,
  Film,
  CreateFilmDTO,
  UpdateFilmDTO
> {
  constructor(private filmUseCase: FilmUseCase) {
    super(filmUseCase);
  }
}