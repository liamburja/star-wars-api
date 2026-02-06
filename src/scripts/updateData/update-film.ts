import 'reflect-metadata';
import { Container } from 'typedi';
import { setupContainer } from '../../container';
import { CreateFilmDTO } from '../../modules/films/interfaces/film.interfaces';
import { FilmUseCase } from '../../modules/films/use-case/film.use-case';
import { DataType, StarWarsApiService } from '../../services/star-wars.api';
import Database from '../../shared/database';
import logger from '../../shared/logger';
import { extractFinallyUrlNumber } from '../../utils/function-utils';
import { AddFilm } from '../addData/add-films';


async function UpdateFilm() {
  await Database.connect();

  setupContainer();

  const filmUseCase = Container.get(FilmUseCase);
  const starWarsApiService = Container.get(StarWarsApiService);


  logger.info('Fetching films from Star Wars API...');
  const { results } = await starWarsApiService.getData(DataType.FILMS);
  const { data } = await filmUseCase.findAll(1, 1000);

  for (const film of results) {
    const numberFilm = extractFinallyUrlNumber(film.url, 'films');

    const existingFilm = data.find(f => f.numberFilm === numberFilm);

    try {
      if (!existingFilm) {
        const filmData: CreateFilmDTO = {
          title: film.title,
          episode_id: film.episode_id,
          opening_crawl: film.opening_crawl,
          director: film.director,
          producer: film.producer,
          release_date: new Date(film.release_date),
          numberFilm: numberFilm,
        };
        await AddFilm(filmData);
        logger.info(`Created film: ${film.title} (Number: ${numberFilm})`);
      } else {

        const apiData = {
          title: film.title,
          episode_id: film.episode_id,
          opening_crawl: film.opening_crawl,
          director: film.director,
          producer: film.producer,
          release_date: new Date(film.release_date),
          numberFilm: numberFilm,
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updates: any = {};

        (Object.keys(apiData) as Array<keyof typeof apiData>).forEach((key) => {
          if (apiData[key] !== existingFilm[key]) {
            updates[key] = apiData[key];
          }
        });

        if (Object.keys(updates).length > 0) {
          await filmUseCase.update(existingFilm.id, updates);
          logger.info(`Updated film: ${film.title} - Changed: ${Object.keys(updates).join(', ')}`);
        } else {
          logger.info(`No changes for: ${film.title}`);
        }
      }
    } catch (error) {
      logger.error(`Failed to update film: ${film.title}. Error: ${error}`);
    }
  }

  await Database.disconnect();
}

UpdateFilm();