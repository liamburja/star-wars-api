import 'reflect-metadata';
import { Container } from 'typedi';
import { setupContainer } from '../../container';
import { CreateFilmDTO } from '../../modules/films/interfaces/film.interfaces';
import { FilmUseCase } from '../../modules/films/use-case/film.use-case';
import { DataType, StarWarsApiService } from '../../services/star-wars.api';
import Database from '../../shared/database';
import logger from '../../shared/logger';
import { extractFinallyUrlNumber } from '../../utils/function-utils';

async function AddAllFilms() {
  await Database.connect();

  setupContainer();

  const filmUseCase = Container.get(FilmUseCase);
  const starWarsApiService = Container.get(StarWarsApiService);


  logger.info('Fetching films from Star Wars API...');

  const {results} = await starWarsApiService.getData(DataType.FILMS);

  for (const film of results) {
    try {
      const numberFilm = extractFinallyUrlNumber(film.url, 'films');
      const filmData: CreateFilmDTO = {
        title: film.title,
        episode_id: film.episode_id,
        opening_crawl: film.opening_crawl,
        director: film.director,
        producer: film.producer,
        release_date: new Date(film.release_date),
        numberFilm: numberFilm,
      };
      
      await filmUseCase.create(filmData);
      logger.info(`Added film: ${film.title} (Number: ${numberFilm})`);
    } catch (error) {
      logger.error(`Failed to add film: ${film.title}. Error: ${error}`);
    }
  }

  await Database.disconnect();
}

export async function AddFilm(data: CreateFilmDTO) {
  await Database.connect();

  setupContainer();

  const filmUseCase = Container.get(FilmUseCase);

  logger.info(`Adding film: ${data.title}`);

  try {
    await filmUseCase.create(data);
  } catch (error) {
    logger.error(`Failed to add film: ${data.title}. Error: ${error}`);
  }
}

AddAllFilms();