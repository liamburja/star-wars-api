import { Service } from 'typedi';
import { BaseRepository } from '../../base/base.repository';
import { IFilmDocument } from '../interfaces/film.interfaces';
import { Film, FilmModel } from '../schemas/film.schema';

@Service()
export class FilmRepository extends BaseRepository<IFilmDocument, Film> {
  constructor() {
    super(FilmModel);
  }
}