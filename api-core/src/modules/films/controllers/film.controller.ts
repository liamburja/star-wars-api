import { Controller } from 'routing-controllers';
import { Service } from 'typedi';
import { BaseController } from '../../base/base.controller';
import { CreateFilmDTO, IFilmDocument, UpdateFilmDTO } from '../interfaces/film.interfaces';
import { Film } from '../schemas/film.schema';
import { FilmUseCase } from '../use-case/film.use-case';

@Controller('/films')
@Service()
export class FilmController extends BaseController<
  IFilmDocument,
  Film,
  CreateFilmDTO,
  UpdateFilmDTO
> {
  constructor(private filmUseCase: FilmUseCase) {
    super(filmUseCase, 'film');
  }
}