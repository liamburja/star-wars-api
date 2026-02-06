import { Service } from 'typedi';
import { BaseRepository } from '../../base/base.repository';
import { Film, FilmModel } from '../schemas/film.schema';
import { IFilmDocument } from '../interfaces/film.interfaces';

@Service()
export class FilmRepository extends BaseRepository<IFilmDocument, Film> {
  constructor() {
    super(FilmModel);
  }
}